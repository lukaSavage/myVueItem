import Vue from 'vue'
import {
    SAVE_GOODS,
    SAVE_RATINGS,
    SAVE_INFO,
    ADD_COUNT,
    REDUCE_COUNT,
} from '../mutation-types'
// 引入接口
import {
    reqGoods,
    reqRatings,
    reqInfo,
} from '../../api'

const state = {
    // 点餐信息
    goods: [],
    // 评价信息
    ratings: [],
    // 商家信息
    info: {},
    // 存储食物数据的容器
    foodContainer: []
}
const mutations = {
    [SAVE_GOODS](state, { goods }) {
        state.goods = goods
    },
    [SAVE_RATINGS](state, { ratings }) {
        state.ratings = ratings
    },
    [SAVE_INFO](state, { info }) {
        state.info = info
    },
    [ADD_COUNT](state, { food }) {
        // 第一次增加食物时,food.count中的count是我们自己添加的
        if (!food.count) {
            //将count数据变为响应式数据
            Vue.set(food, 'count', 1)
            state.foodContainer.push(food)
            // state.count = 1
        } else {
            food.count++
        }
    },
    [REDUCE_COUNT](state, { food }) {
        // 有食物的时候
        if (food.count) {
            food.count--
            if(food.count===0){
                state.foodContainer.splice(state.foodContainer.indexOf(food),1)
            }
        } else {
            food.count = 0
            
        }
    },

}
const actions = {
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
    },
    updateCount({ commit }, { isAdd, food }) {
        // 判断isAdd是增加还是删除
        if (isAdd) {
            commit(ADD_COUNT, { food })
        } else {
            commit(REDUCE_COUNT, { food })
        }
    }
}
const getters = {
    // 计算总数量
    totalCount(state){
        return state.foodContainer.reduce((prev,current)=>prev+current.count,0)
    }, 
    // 计算总价格
    totalPrice(state){
        return state.foodContainer.reduce((prev,current)=>prev+(current.count*current.price),0)
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
}