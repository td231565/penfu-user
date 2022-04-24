import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lineUid: '',
    lineUserName: '',
    linePhotoUrl: '',
    userInfo: {}
  },
  mutations: {
    setLineProfile(state, payload) {
      const { userId, displayName, pictureUrl } = payload
      state.lineUid = userId
      state.lineUserName = displayName
      state.linePhotoUrl = pictureUrl
    },
    setUserInfo(state, payload) {
      const result = {}
      Object.keys(payload).forEach(key => {
        result[key] = payload[key] || ''
      })
      state.userInfo = result
    }
  },
  actions: {
  },
  modules: {
  }
})
