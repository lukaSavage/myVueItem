// 1.引入vue
import Vue from 'vue'

// 2.引入app
import App from './App.vue'

// 3.去除vue在控制台的提示信息

Vue.config.productionTip = false

// 4.实例化vue对象
/* eslint-disable no-new */
new Vue({
  el: '#app',
  // 注册组件
  components: {
    App
  },
  // 使用模板
  template: '<App/>'
})