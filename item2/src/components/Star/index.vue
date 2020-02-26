<template>
    <div class="star" :class="`star-${size}`">
        <span class="star-item" :class="item" v-for="(item,index) in classArr" :key="index"></span>
        
    </div>
</template>

<script>
export default {
    name: 'Star',
    props: {
        size: String,
        // 这里相当于传过来的分数
        score: Number
    },
    /**
     * 星星数量和样式说明:
     * on--->满星 half---->半星 off---->灰星
     * 用一个数组把on、half、off 存储起来
     * 如：['on','on','on','half','off']
     */
    computed: {
        classArr() {
            // 定义一个空数组
            const arr = []
            const { score } = this

            // 先获取分数,规则如下
            /* 
                4.7分 ------4颗满星   0.7 ------半颗星星
                3.6分 ------3颗满星   0.6 ------半颗星星  再加一颗灰色星星
                3.1分 ------3颗满星   0.1 ------ 0个半星  2个灰色星星
            */
            // 1.先计算满星的个数
            let scoreInt = Math.floor(score)
            for (let i = 0; i < scoreInt; i++) {
                arr.push('on')                
            }
            // 2.再计算半颗星星
            if(score-scoreInt>=0.5){
                arr.push('half')
            }
            // 3.计算灰色星星
            while (arr.length<5) {
                arr.push('off')
            }
            return arr
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl'
.star // 2x图 3x图
    float left
    font-size 0
    .star-item
        display inline-block
        background-repeat no-repeat
    &.star-48
        .star-item
            width 20px
            height 20px
            margin-right 22px
            background-size 20px 20px
            &:last-child
                margin-right 0
            &.on
                bg-image('./images/stars/star48_on')
            &.half
                bg-image('./images/stars/star48_half')
            &.off
                bg-image('./images/stars/star48_off')
    &.star-36
        .star-item
            width 15px
            height 15px
            margin-right 6px
            background-size 15px 15px
            &:last-child
                margin-right 0
            &.on
                bg-image('./images/stars/star36_on')
            &.half
                bg-image('./images/stars/star36_half')
            &.off
                bg-image('./images/stars/star36_off')
    &.star-24
        .star-item
            width 10px
            height 10px
            margin-right 3px
            background-size 10px 10px
            &:last-child
                margin-right 0
            &.on
                bg-image('./images/stars/star24_on')
            &.half
                bg-image('./images/stars/star24_half')
            &.off
                bg-image('./images/stars/star24_off')
</style>
