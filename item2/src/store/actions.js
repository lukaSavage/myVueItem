import {
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORIES,
    RECEIVE_SHOPS,
    SAVE_USER,
    SAVE_TOKEN,
    RESET_USER,
    RESET_TOKEN,
    SAVE_GOODS,
    SAVE_RATINGS,
    SAVE_INFO,
} from './mutation-types'

// 引入接口
import {
    reqAddress,
    reqShops,
    reqCategories,
    reqAutoLogin,
    reqGoods,
    reqRatings,
    reqInfo
} from '../api'
export default {
    async getAddress({ commit, state }) {
        // 把经纬度解构出来
        const { longitude, latitude } = state
        // 调用接口发送异步请求
        const result = await reqAddress({ longitude, latitude })
        //判断响应的数据是否成功
        if (result.code === 0) {
            // 成功获取数据
            const address = result.data
            // 将address传入mutation中
            commit(RECEIVE_ADDRESS, address)
        }
    },
    async getCategories({ commit }) {
        const result = await reqCategories()
        if (result.code === 0) {
            const categories = result.data
            commit(RECEIVE_CATEGORIES, categories)
        }
    },
    async getShops({ commit, state }) {
        const { longitude, latitude } = state
        const result = await reqShops({ longitude, latitude })
        if (result.code === 0) {
            const shops = result.data
            commit(RECEIVE_SHOPS, shops)
        }
    },
    // 该方法用于保存用户信息和token的
    saveUser({ commit }, user) {
        // 获取token
        const token = user.token
        // 保存token到redux中
        commit(SAVE_TOKEN, token)
        // 保存token到localStorage中
        localStorage.setItem('token_key', token)
        // 保存user到redux中
        commit(SAVE_USER, user)
    },
    // 退出操作，删除token和用户信息
    logout({ commit }) {
        // 重置user
        commit(RESET_USER)
        // 重置token
        commit(RESET_TOKEN)
        // 清空localStorage的token
        localStorage.removeItem('token_key')
    },
    // 自动登录方法(这个方法应该在APP组件上调用)
    async autoLogin({ commit, state }) {
        const token = state.token
        if (token) {
            // 调用自动登录的接口
            const result = await reqAutoLogin()
            if (result.code === 0) {
                // 有数据 --- user对象
                const user = result.data
                // 更新user对象中的数据
                commit(SAVE_USER, user)
            }
        }
    },
    async getGoods({ commit }) {
        const res = await reqGoods()
        // 判断是否获取成功
        if (res.code === 0) {
            const goods = res.data
            // mutation 的方法更新数据
            commit(SAVE_GOODS, { goods })
        }
    },
    async getRatings({ commit }) {
        const res = await reqRatings()
        // 判断是否获取成功
        if (res.code === 0) {
            const ratings = res.data
            // mutation 的方法更新数据
            commit(SAVE_RATINGS, { ratings })
        }
    },
    async getInfo({ commit }) {
        const res = await reqInfo()
        // 判断是否获取成功
        if (res.code === 0) {
            const info = res.data
            // mutation 的方法更新数据
            commit(SAVE_INFO, { info })
        }
    }
}