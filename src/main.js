import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/style/bootstrap-utilities.min.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { VueMasonryPlugin } from 'vue-masonry'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(ElementUI)
Vue.use(VueMasonryPlugin)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyD_AgGdaurtw8ICZdug7re8xfMZrUvAjQ4',
    libraries: 'places' // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing,visualization'
  },
  installComponents: true
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
