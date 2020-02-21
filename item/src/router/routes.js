// 引入路由组件
import MSite from '../pages/MSite'
import Order from '../pages/Order'
import Profile from '../pages/Profile'
import Search from '../pages/Search'
import Login from '../pages/Login'
// 向外暴露数组
export default [
    {
        path: '/msite',
        component: MSite,
        meta: {
            isShowFooter: true
        }
    },
    {
        path: '/order',
        component: Order,
        meta: {
            isShowFooter: true
        }
    },
    {
        path: '/profile',
        component: Profile,
        meta: {
            isShowFooter: true
        }
    },
    {
        path: '/search',
        component: Search,
        meta: {
            isShowFooter: true
        }
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/',
        redirect: '/msite'
    }
    
    
]