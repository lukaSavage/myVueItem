import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
// 如果在一个模块化工程中使用它，必须要通过 Vue.use() 明确地安装路由功能
Vue.use(VueRouter)
// 并向外暴露一个路由器对象
export default new VueRouter({
    // 在这里进行路由的配置
    mode: 'history',
    routes
})