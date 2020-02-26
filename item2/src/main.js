// 1.引入vue
import Vue from 'vue'
import { Button } from 'mint-ui'
// 2.引入app
import App from './App.vue'
import router from './router'
// 引入公共组件Header
import Header from './components/Header'
import Star from './components/Star'
//引入vuex中的store文件
import store from './store'
// 引入表单验证的文件
import './validate'
// 引入mock的js文件
import './mock/mock-serve'
// 注册成公共组件,其他任意子组件可以直接使用
Vue.component(Header.name, Header)
Vue.component(Star.name, Star)
Vue.component(Button.name, Button)
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
    router,
    // 注册store
    store

})
