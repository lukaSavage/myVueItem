export default {
    // 经纬度
    longitude: '116.36867',
    latitude: '40.10038',
    // 地址信息
    address: {},
    // 食品分类信息
    categories: [],
    // 商铺信息
    shops: [],  
    
    // 用户信息和token
    user: {},
    // 为什么不是''? 因为当我们关闭浏览器后，vuex数据清空，再次打开，走的是自动登录，所以有token
    token: localStorage.getItem('token_key'),  
    
    // 点餐信息
    goods: [],
    // 评价信息
    ratings: [],
    // 商家信息
    info: {},
}