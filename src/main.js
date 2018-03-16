// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
//import VueValidator from '@/../static/vue-validator.js'
//
//Vue.use(VueValidator)




import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'


import App from './App'
import router from './router/index'
import store from './vuex/store'
//import FastClick from 'fastclick'


Vue.config.productionTip = false


Vue.use(MintUI)



import iView from 'iview'


Vue.use(iView)

import VueScroller from '@/../static/vue-scroller.min.js'
Vue.use(VueScroller)

//router.beforeEach((to, from, next) => {
//store.commit('scroller_show_status', true)  
//next()
//})


//if ('addEventListener' in document) {
//  document.addEventListener('DOMContentLoaded', function() {
//      FastClick.attach(document.body)
//  }, false)
//}
//import Lazyload from "@/../static/vue.lazyimg.js"
//Vue.use(Lazyload,{
//	time: 10,
//	fade: true,
//	speed: 20
//})

//import Vuelidate from 'vuelidate'
//Vue.use(Vuelidate)

//import Vuerify from 'vuerify'
//Vue.use(Vuerify)

//Vue.use(chart)

//Vue.use(echart)
//import VueOccupy from 'vue-occupy'
//
//Vue.use(VueOccupy)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  render: h => h(App)
})
