import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import 'assets/css/reset.css'

import './plugins/element.js'
import { toFormat } from './utils/moment'

Vue.config.productionTip = false

Vue.filter('moment', toFormat)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
