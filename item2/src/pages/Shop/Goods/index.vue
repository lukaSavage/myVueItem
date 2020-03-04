<template>
    <div>
        <div class="goods">
            <div class="menu-wrapper">
                <ul ref="leftUl">
                    <!-- current,那个被选中，哪个就有该样式 -->
                    <li
                        class="menu-item"
                        :class="{current:currentIndex===index}"
                        v-for="(item,index) in goods"
                        :key="index"
                        @click="click(index)"
                    >
                        <img class="icon" :src="item.icon" v-if="item.icon" />
                        <span class="text bottom-border-1px">{{item.name}}</span>
                    </li>
                </ul>
            </div>
            <div class="foods-wrapper">
                <ul>
                    <li class="food-list-hook" v-for="(item,index) in goods" :key="index">
                        <h1 class="title">{{item.name}}</h1>
                        <ul ref="rightUl">
                            <li
                                class="food-item bottom-border-1px"
                                v-for="(food,index) in item.foods"
                                :key="index"
                                @click="showDetail(food)"
                            >
                                <div class="icon">
                                    <img width="57" height="57" :src="food.icon" />
                                </div>
                                <div class="content">
                                    <h2 class="name">{{food.name}}</h2>
                                    <p class="desc">{{food.description}}</p>
                                    <div class="extra">
                                        <span class="count">月售{{food.sellCount}}份</span>
                                        <span>好评率{{food.rating}}%</span>
                                    </div>
                                    <div class="price">
                                        <span class="now">￥{{food.price}}</span>
                                        <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                                    </div>
                                    <div class="cartcontrol-wrapper">
                                        <CartControl :food="food" />
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <ShopCart />
        </div>
        <Food :food="food" ref="foodComponent" />
    </div>
</template>

<script>
import { mapState } from 'vuex'
// 引入滑动插件
import BScroll from 'better-scroll'
import Food from './Food'
import ShopCart from './ShopCart'
export default {
    name: 'Goods',
    components: {
        Food,
        ShopCart,
    },
    data() {
        return {
            scrollY: 0,
            tops: [],
            food: {}
        }
    },
    computed: {
        ...mapState({
            goods: state => state.shop.goods
        }),
        currentIndex() {
            const { scrollY, tops } = this
            const index = tops.findIndex(
                (item, index) => scrollY >= item && scrollY < tops[index + 1]
            )
            // 判断此时的index是否和左侧的索引值一致，如果不一致，则让左侧滑动(每次计算把当前的索引值保存起来)
            // 如果上次的索引值和这次不一致↓
            let current = null
            if (current !== index && this.leftScroll) {
                // 保存起来
                current = index
                // 获取左侧列表的所有的li标签
                const li = this.$refs.leftUl.children[current]
                // 移动
                this.leftScroll.scrollToElement(li, 300)
            }
            // console.log(index);
            return index
        }
    },
    async mounted() {
        await this.$store.dispatch('getGoods')
        // 创建左右侧滑动对象(把实例出的对象放到methods中，通过调用方法得到，以后会用到)
        this.scrollFunc()
        // 初始化tops数组数据
        this.initTopsFunc()
    },
    methods: {
        scrollFunc() {
            this.leftScroll = new BScroll('.menu-wrapper')
            this.rightScroll = new BScroll('.foods-wrapper', {
                click: true,
                probeType: 3
            })
            this.rightScroll.on('scroll', ({ y }) => {
                this.scrollY = Math.abs(y)
            })
            this.rightScroll.on('scrollEnd', ({ y }) => {
                this.scrollY = Math.abs(y)
            })
        },
        initTopsFunc() {
            const currentArr = [0]
            const ulList = this.$refs.rightUl
            // console.log(ulList);
            let value = 0
            ulList.forEach(item => {
                value += item.clientHeight
                currentArr.push(value)
            })
            // console.log(currentArr)
            this.tops = currentArr
        },
        click(index) {
            const scrollY = this.tops[index]
            this.scrollY = scrollY
            // 让右侧跟着走动(此时只是current样式变化，左侧并没有滑动)
            this.rightScroll.scrollTo(0, -scrollY, 300)
        },
        showDetail(food) {
            // console.log(food);
            this.food = food
            this.$refs.foodComponent.reverse()
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../../common/stylus/mixins.styl'
.goods
    display flex
    position absolute
    top 225px
    bottom 46px
    width 100%
    background #fff
    overflow hidden
    .menu-wrapper
        flex 0 0 80px
        width 80px
        background #f3f5f7
        .menu-item
            display table
            height 54px
            width 56px
            padding 0 12px
            line-height 14px
            &.current
                position relative
                z-index 10
                margin-top -1px
                background #fff
                color $green
                font-weight 700
                .text
                    border-none()
            .icon
                display inline-block
                vertical-align top
                width 12px
                height 12px
                margin-right 2px
                background-size 12px 12px
                background-repeat no-repeat
            .text
                display table-cell
                width 56px
                vertical-align middle
                bottom-border-1px(rgba(7, 17, 27, 0.1))
                font-size 12px
    .foods-wrapper
        flex 1
        .title
            padding-left 14px
            height 26px
            line-height 26px
            border-left 2px solid #d9dde1
            font-size 12px
            color rgb(147, 153, 159)
            background #f3f5f7
        .food-item
            display flex
            margin 18px
            padding-bottom 18px
            bottom-border-1px(rgba(7, 17, 27, 0.1))
            &:last-child
                border-none()
                margin-bottom 0
            .icon
                flex 0 0 57px
                margin-right 10px
            .content
                flex 1
                .name
                    margin 2px 0 8px 0
                    height 14px
                    line-height 14px
                    font-size 14px
                    color rgb(7, 17, 27)
                .desc, .extra
                    line-height 10px
                    font-size 10px
                    color rgb(147, 153, 159)
                .desc
                    line-height 12px
                    margin-bottom 8px
                .extra
                    .count
                        margin-right 12px
                .price
                    font-weight 700
                    line-height 24px
                    .now
                        margin-right 8px
                        font-size 14px
                        color rgb(240, 20, 20)
                    .old
                        text-decoration line-through
                        font-size 10px
                        color rgb(147, 153, 159)
                .cartcontrol-wrapper
                    position absolute
                    right 0
                    bottom 12px
</style>


