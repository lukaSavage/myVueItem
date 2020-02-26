// 引入Mock
import Mock from 'mockjs'
// 引入data
import data from './data.json'
// 拦截接口,生成随机数据
Mock.mock('/goods', { code: 0, data: data.goods })
Mock.mock('/ratings', { code: 0, data: data.ratings })
Mock.mock('/info', { code: 0, data: data.info })