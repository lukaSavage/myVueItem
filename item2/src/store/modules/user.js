import {
    SAVE_USER,
    SAVE_TOKEN,
    RESET_USER,
    RESET_TOKEN,
} from '../mutation-types'
// 引入接口
import {
    reqAutoLogin,
} from '../../api'

const state = {
    // 用户信息和token
    user: {},
    // 为什么不是''? 因为当我们关闭浏览器后，vuex数据清空，再次打开，走的是自动登录，所以有token
    token: localStorage.getItem('token_key'),
}
const mutations = {
    [SAVE_USER](state, user) {
        state.user = user
    },
    [SAVE_TOKEN](state, token) {
        state.token = token
    },
    [RESET_USER](state) {
        state.user = {}
    },
    [RESET_TOKEN](state) {
        state.token = ''
    },
}
const actions = {
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
}
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters,
}