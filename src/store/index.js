import Vue from 'vue'
import Vuex from 'vuex'
import liff from '@line/liff'
import axios from '@/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lineUid: '',
    lineUserName: '',
    linePhotoUrl: '',
    userInfo: { usernameChinese: '' },
    paymentInfo: {},
    plans: []
  },
  mutations: {
    setLineProfile(state, payload) {
      const { userId, displayName, pictureUrl } = payload
      state.lineUid = userId
      state.lineUserName = displayName
      state.linePhotoUrl = pictureUrl
    },
    setUserInfo(state, payload) {
      Object.keys(payload).forEach(key => {
        state.userInfo[key] = payload[key] || ''
      })
    },
    setPaymentInfo(state, payload) {
      state.paymentInfo = payload
    },
    setPlans(state, payload) {
      state.plans = payload
    }
  },
  actions: {
    liffInit({ commit }) {
      return new Promise((resolve, reject) => {
        liff.init({
          liffId: '1657060057-zx3LN0rZ',
          // liffId: '1657060057-waPNJ3Bl', // test
          withLoginOnExternalBrowser: true
        }).then(() => {
          if (liff.isLoggedIn()) {
            liff.getProfile().then(profile => {
              commit('setLineProfile', profile)
              // 新加入的使用者導頁去填寫個人資料
              console.log('init')
              console.log(profile.userId)
              function userLogin(lineID) {
                // this.isLoading = true
                axios.post('user/getUser', {
                  lineID
                }).then(res => {
                  const { new: isNew, result } = res.data
                  commit('setUserInfo', result)
                  if (isNew) {
                    this.$router.push({ name: 'ProfileDetail' })
                  } else {
                    const path = localStorage.getItem('path')
                    if (path !== location.pathname) {
                      this.$router.push(path)
                    }
                  }
                  resolve(lineID)
                  // this.isLoading = false
                }).catch(() => {
                  this.$message.error('取得資料錯誤')
                  reject('user login error')
                  // this.isLoading = false
                })
              }
              userLogin(profile.userId)
            })
          } else {
            // 取得使用者要去的 route 讓他再回去
            // liff.login({
            //   redirectUri: 'https://stellular-kheer-3800d2.netlify.app/'
            // })
          }
        }).catch(err => {
          console.log(err)
          reject(err)
        })
      })
    }
  },
  modules: {
  }
})
