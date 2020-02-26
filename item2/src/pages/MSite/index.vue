<template>
    <div class="on">
        <section class="msite">
            <!--首页头部-->
            <!-- <header class="header">
                <span class="header_search">
                    <i class="iconfont icon-sousuo"></i>
                </span>
                <span class="header_title">
                    <span class="header_title_text ellipsis">昌平区北七家宏福科技园(337省道北)</span>
                </span>
                <span class="header_login">
                    <span class="header_login_text">登录|注册</span>
                </span>
            </header>-->
            <Header :title="address.name || '正在定位中...'">
                <span class="header_search" slot="left">
                    <i class="iconfont icon-sousuo"></i>
                </span>
                <span class="header_login" slot="right">
                    <span class="header_login_text">登录|注册</span>
                </span>
            </Header>
            <!--首页导航-->
            <nav class="msite_nav">
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <div
                            class="swiper-slide"
                            v-for="(item,index) in categoriesArr"
                            :key="index"
                        >
                            <a
                                href="javascript:"
                                class="link_to_food"
                                v-for="(things,index) in item"
                                :key="index"
                            >
                                <div class="food_container">
                                    <img :src="`https://fuss10.elemecdn.com`+things.image_url" />
                                </div>
                                <span>{{things.title}}</span>
                            </a>
                        </div>
                    </div>
                    <!-- Add Pagination -->
                    <div class="swiper-pagination"></div>
                </div>
            </nav>
            <!--首页附近商家-->
            <ShowList />
        </section>
    </div>
</template>

<script>
import ShowList from '../../components/ShopList'
// 引入Swiper
import Swiper from 'swiper'
// 引入swiper的样式
import 'swiper/css/swiper.css'
// 引入vuex中的mapState方法，从而可以使用vuex的状态数据
import { mapState } from 'vuex'

export default {
    name: 'MSite',
    components: {
        ShowList
    },
    mounted() {
        // 调用actions发送异步请求
        this.$store.dispatch('getShops')
        this.$store.dispatch('getCategories')
        /* eslint-disable */
        // var mySwiper = new Swiper('.swiper-container', {
        //     // direction: 'vertical', // 垂直切换选项
        //     loop: true, // 循环模式选项

        //     // 如果需要分页器
        //     pagination: {
        //         el: '.swiper-pagination'
        //     }
        // })
    },
    watch: {
        // 解决同步和异步不一致导致渲染有误的BUG
        categories() {
            /* 第①种方法：通过$nextTick方法将回调延迟到下次DOM更新循环之后执行。在修改数据之后立即使用它，然后等待DOM更新 */
            this.$nextTick(() => {
                /* eslint-disable */
                var mySwiper = new Swiper('.swiper-container', {
                    // direction: 'vertical', // 垂直切换选项
                    loop: true, // 循环模式选项

                    // 如果需要分页器
                    pagination: {
                        el: '.swiper-pagination'
                    }
                })
            })
        }
    },
    computed: {
        ...mapState(['address', 'categories']),
        categoriesArr() {
            // 从vuex中获取数组数据
            const { categories } = this
            // 定义一个大数组
            let bigArr = []
            // 定义一个小数组
            let smallArr = []
            categories.forEach((item, index) => {
                // 判断小数组是否为空，如果是空，则把他添加到大数组去
                if (smallArr.length === 0) {
                    bigArr.push(smallArr)
                }
                // 当满了8个则清空小数组，然后继续放
                smallArr.push(item)
                if (smallArr.length === 8) {
                    smallArr = []
                }
            })
            return bigArr
        }
    }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl'
.msite // 首页
    width 100%
    .msite_nav
        bottom-border-1px(#e4e4e4)
        margin-top 45px
        height 200px
        background #fff
        .swiper-container
            width 100%
            height 100%
            .swiper-wrapper
                width 100%
                height 100%
                .swiper-slide
                    display flex
                    justify-content center
                    align-items flex-start
                    flex-wrap wrap
                    .link_to_food
                        width 25%
                        .food_container
                            display block
                            width 100%
                            text-align center
                            padding-bottom 10px
                            font-size 0
                            img
                                display inline-block
                                width 50px
                                height 50px
                        span
                            display block
                            width 100%
                            text-align center
                            font-size 13px
                            color #666
            .swiper-pagination
                >span.swiper-pagination-bullet-active
                    background #02a774
</style>
