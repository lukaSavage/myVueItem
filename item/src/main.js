// 1.引入vue
import Vue from 'vue'

// 2.引入app
import App from './App.vue'
import router from './router'
// 引入公共组件Header
import Header from './components/Header'
// 注册成公共组件,其他任意子组件可以直接使用
Vue.component(Header.name, Header)
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
    template: '<App/>',
    router

})
