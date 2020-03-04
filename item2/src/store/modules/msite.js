import {
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORIES,
    RECEIVE_SHOPS,
} from '../mutation-types'
import {
    reqAddress,
    reqShops,
    reqCategories,
} from '../../api'
const state = {
    // 经纬度
    longitude: '116.36867',
    latitude: '40.10038',
    // 地址信息
    address: {},
    // 食品分类信息
    categories: [],
    // 商铺信息
    shops: [],
}
const mutations = {
    [RECEIVE_ADDRESS](state, address) {
        state.address = address
    },
    [RECEIVE_CATEGORIES](state, categories) {
        state.categories = categories
    },
    [RECEIVE_SHOPS](state, shops) {
        state.shops = shops
    },
}
const actions = {
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
}
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters,
}