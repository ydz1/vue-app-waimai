import Vue from 'vue'
import App from './App'
import { Button } from 'mint-ui'
import VueLazyload from 'vue-lazyload'

import '../static/css/reset.css'
import router from './router/index'
import store from './store/index'
import './mock/mock.server'
import loading from './common/imgs/loading.gif'
import './filters/index'
Vue.component(Button.name, Button)
Vue.use(VueLazyload, {
  loading
})
/*
eslint-disable no-new
 */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
