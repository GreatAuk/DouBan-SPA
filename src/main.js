// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import router from './router/index'
import axios from 'axios'
Vue.prototype.$http=axios

// 添加Fastclick移除移动端点击延迟
FastClick.attach(document.body)

//关闭生产模式下给出的提示
Vue.config.productionTip = false
Vue.config.silent = true

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
