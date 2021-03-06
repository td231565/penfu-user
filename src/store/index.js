import Vue from 'vue'
import Vuex from 'vuex'

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
  },
  modules: {
  }
})
