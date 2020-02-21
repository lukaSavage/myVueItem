<template>
    <div>
        <router-view />
        <Footer v-show="$route.meta.isShowFooter"/>
    </div>
</template>

<script>
// 引入Footer组件
import Footer from './components/Footer'
export default {
    name: 'App',
    components: {
        Footer,
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
