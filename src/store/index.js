import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lineUid: 'U59f9a10d5b430ae4d5f299a445b25a5c',
    lineUserName: '',
    linePhotoUrl: 'https://profile.line-scdn.net/ch/v2/p/ub4d009ef64a0d4b49c2e18c8ba2a7b67/1357129184973',
    userInfo: {},
    paymentInfo: {},
    bikeInfo: {}
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
    setBikeInfo(state, payload) {
      state.bikeInfo = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
