<template>
    <div>
        <router-view />
        <Footer v-show="$route.meta.isShowFooter" />
    </div>
</template>

<script>
// 引入Footer组件
import Footer from './components/Footer'
// 将api获取数据的方法引过来
// import { reqAddress, reqCategories, reqShops } from './api'
export default {
    name: 'App',
    components: {
        Footer
    },
    mounted() {
        this.$store.dispatch('getAddress')
        // 以下两个请求不应该在这里发送，注释掉
        // this.$store.dispatch('getCategories')
        // this.$store.dispatch('getShops')
        // 自动登录方法的调用
        this.$store.dispatch('autoLogin')
    },
    // async mounted() {
    //     // 界面渲染后,发送请求,获取地址信息
    //     // this.$store.dispatch('getAddress')
    //     // this.$store.dispatch('getCategorys')
    //     // this.$store.dispatch('getShops')
    //     const result1 = await reqAddress({
    //       longitude: '116.36867',
    //       latitude: '40.10038'
    //     })
    //     const result2 = await reqCategories()
    //     const result3 = await reqShops({
    //       longitude: '116.36867',
    //       latitude: '40.10038'
    //     })
    //     console.log(result1)
    //     console.log(result2)
    //     console.log(result3)
    // }
}
</script>

<style lang="stylus" rel="stylesheet/stylus"></style>
