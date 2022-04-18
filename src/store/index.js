import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lineUid: '',
    lineUserName: '',
    linePhotoUrl: ''
  },
  mutations: {
    setLineProfile(state, payload) {
      const { userId, displayName, pictureUrl } = payload
      state.lineUid = userId
      state.lineUserName = displayName
      state.linePhotoUrl = pictureUrl
    }
  },
  actions: {
  },
  modules: {
  }
})
