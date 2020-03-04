// 引入axios
import axios from 'axios'
// 引入qs
import qs from 'qs'
import store from '../store'
import { Toast } from 'mint-ui'
import router from '../router'
// 添加请求拦截器
axios.interceptors.request.use(config => {
    const { method, data } = config
    // 判断,method中是不是POST请求,并且data应该是一个对象----->urlEncoding形式
    if (method.toUpperCase() === 'POST' && data instanceof Object) {
        config.data = qs.stringify(data)
    }
    if (config.headers.needToken) {
        // 取出token
        const token = store.state.user.token
        // 判断token是否存在
        if (token) {
            config.headers.authorization = token
        } else {
            const error = new Error('没有token，请重新登录')
            error.status = 401
            throw error
        }
    }
    return config
})
// 添加响应拦截器
axios.interceptors.response.use(response => {
    return response.data
}, error => {
    if (!error.response) {
        // 请求的时候的错误消息
        if (error.status === 401) {
            //再次判断如果此时不是login界面，那么跳转到该界面
            if (router.currentRoute.path !== '/login') {
                //提示错误消息，并跳转
                Toast(error.message)
                router.replace('/login')
            }

        }
    } else {
        // 响应的时候错误的消息
        const status = error.response.status
        if (status === 401) {
            // token过期，跳转到login
            if(router.currentRoute.path!=='/login'){
                // 提示错误消息
                Toast(error.response.data.message)
                store.dispatch('resetLogin')
                // 跳转界面
                router.replace('/login')
                
            }
        }else if(status === 404){
            Toast('没有资源')
        }else{
            Toast('请求错误:'+ error.message)
        }
    }
    // 中断错误消息
    return new Promise(() => { })
})
// 向外暴露axios
export default axios
