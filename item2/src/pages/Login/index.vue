<template>
    <section class="loginContainer">
        <div class="loginInner">
            <div class="login_header">
                <h2 class="login_logo">硅谷外卖</h2>
                <div class="login_header_title">
                    <a
                        href="javascript:;"
                        :class="{on:isChecked}"
                        @click.prevent="isChecked=true"
                    >短信登录</a>
                    <a
                        href="javascript:;"
                        :class="{on:!isChecked}"
                        @click.prevent="isChecked=false"
                    >密码登录</a>
                </div>
            </div>
            <div class="login_content">
                <form>
                    <div :class="{on: isChecked}">
                        <section class="login_message">
                            <input
                                type="tel"
                                maxlength="11"
                                placeholder="手机号"
                                v-model="phone"
                                name="phone"
                                v-validate="'required|phone'"
                            />
                            <span style="color: red">{{errors.first('phone')}}</span>
                            <button
                                :disabled="!isRightPhone || time>0"
                                :class="{right:isRightPhone && time===0}"
                                class="get_verification"
                                @click.prevent="validate"
                            >{{time>0?`请在${this.time}s后重新发送`:`获取验证码`}}</button>
                        </section>
                        <section class="login_verification">
                            <input
                                type="tel"
                                maxlength="8"
                                placeholder="验证码"
                                v-model="emailCaptcha"
                                name="emailCaptcha"
                                v-validate="'required'"
                            />
                            <span style="color: red">{{errors.first('emailCaptcha')}}</span>
                        </section>
                        <section class="login_hint">
                            温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
                            <a href="javascript:;">《用户服务协议》</a>
                        </section>
                    </div>
                    <div :class="{on: !isChecked}">
                        <section>
                            <section class="login_message">
                                <input
                                    type="tel"
                                    maxlength="11"
                                    placeholder="手机/邮箱/用户名"
                                    v-model="name"
                                    name="name"
                                    v-validate="'required'"
                                />
                                <span style="color: red">{{errors.first('name')}}</span>
                            </section>
                            <section class="login_verification">
                                <input
                                    :type="isText?'text':'password'"
                                    maxlength="8"
                                    placeholder="密码"
                                    v-model="pwd"
                                    name="pwd"
                                    v-validate="'required'"
                                />
                                <span style="color: red">{{errors.first('pwd')}}</span>
                                <div
                                    class="switch_button"
                                    :class="isText?'on':'off'"
                                    @click="isText=!isText"
                                >
                                    <div class="switch_circle" :class="{run_circle:isText}"></div>
                                    <span class="switch_text">{{isText?'abc':'...'}}</span>
                                </div>
                            </section>
                            <section class="login_message">
                                <input
                                    type="text"
                                    maxlength="11"
                                    placeholder="验证码"
                                    v-model="captcha"
                                    name="captcha"
                                    v-validate="'required'"
                                />
                                <span style="color: red">{{errors.first('captcha')}}</span>
                                <img
                                    @click="sendCaptcha"
                                    ref="captcha"
                                    class="get_verification"
                                    src="http://localhost:5000/captcha"
                                    alt="captcha"
                                />
                            </section>
                        </section>
                    </div>
                    <button class="login_submit" @click.prevent="login">登录</button>
                </form>
                <a href="javascript:;" class="about_us">关于我们</a>
            </div>
            <a href="javascript:" class="go_back" @click="$router.back()">
                <i class="iconfont icon-jiantou2"></i>
            </a>
        </div>
    </section>
</template>

<script>
import { Toast, messageBox } from 'mint-ui'

import { reqSendCode, reqNodeLogin, reqPwdLogin } from '../../api'
export default {
    name: 'Login',
    data() {
        return {
            isChecked: true, // true 代表短信方式, false 代表密码登录方式
            phone: '',
            time: 0, // 用来做短信倒计时的
            isText: false, //用来做密码显示或者隐藏的
            verification: '', //短信验证码
            name: '', //用户名
            pwd: '', //用户密码
            captcha: '', //图形验证码
            emailCaptcha: '' //短信验证码
        }
    },
    computed: {
        isRightPhone() {
            return /[1]\d{10}/.test(this.phone)
        }
    },
    methods: {
        async validate() {
            console.log(1111)
            this.time = 10
            this.timer = setInterval(() => {
                this.time--
                if (this.time <= 0) {
                    clearInterval(this.timer)
                }
            }, 1000)
            // 发送验证码，调用发送验证码的接口reqSendCode
            const result = await reqSendCode(this.phone)
            // 判断是否发送成功了
            if (result.code === 0) {
                // 发送成功
                Toast('发送成功')
            } else {
                // 发送失败
                messageBox('提示', '发送失败')
            }
        },
        // 发送请求，切换图形验证码
        sendCaptcha() {
            this.$refs.captcha.src =
                'http://localhost:5000/captcha?time=' + Date.now()
        },
        async login() {
            // 获取各项数据及登录方式
            const { isChecked, phone, verification, name, pwd, captcha } = this
            let names
            // 判断是哪一种登录方式
            if (isChecked) {
                //短信方式
                names = ['phone', 'verification']
            } else {
                // 验证码方式
                names = ['name', 'pwd', 'captcha']
            }
            const success = await this.$validator.validateAll(names) //表单整体校验
            // 判断表单验证是否通过
            if (success) {
                // console.log('表单验证成功~')
                //调用不同的登录接口
                //再次判断登录方式
                let result
                if (isChecked) {
                    // 短信方式
                    result = await reqNodeLogin(phone, verification)
                    // 登录成功了就清空文本框
                    this.verification = ''
                } else {
                    // 验证码方式
                    result = await reqPwdLogin(name, pwd, captcha)
                    // 登录成功就重新刷新验证码并清空
                    this.sendCaptcha()
                    this.captcha = ''

                }
                console.log(result);
                // 判断调用接口后登录是否成功
                if(result.code === 0){
                    // 保存用户信息(result.data里面包含id,name,token三个信息)
                    const user =result.data
                    // 把数据更新到vuex中
                    this.$store.dispatch('saveUser',user)
                    // 跳转界面
                    this.$router.replace('/profile')

                }
            }
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
        padding-top 60px
        width 80%
        margin 0 auto
        .login_header
            .login_logo
                font-size 40px
                font-weight bold
                color #02a774
                text-align center
            .login_header_title
                padding-top 40px
                text-align center
                >a
                    color #333
                    font-size 14px
                    padding-bottom 4px
                    &:first-child
                        margin-right 40px
                    &.on
                        color #02a774
                        font-weight 700
                        border-bottom 2px solid #02a774
        .login_content
            >form
                >div
                    display none
                    &.on
                        display block
                    input
                        width 100%
                        height 100%
                        padding-left 10px
                        box-sizing border-box
                        border 1px solid #ddd
                        border-radius 4px
                        outline 0
                        font 400 14px Arial
                        &:focus
                            border 1px solid #02a774
                    .login_message
                        position relative
                        margin-top 16px
                        height 48px
                        font-size 14px
                        background #fff
                        .get_verification
                            position absolute
                            top 50%
                            right 10px
                            transform translateY(-50%)
                            border 0
                            color #ccc
                            font-size 14px
                            background transparent
                            &.right
                                color #000000
                    .login_verification
                        position relative
                        margin-top 16px
                        height 48px
                        font-size 14px
                        background #fff
                        .switch_button
                            font-size 12px
                            border 1px solid #ddd
                            border-radius 8px
                            transition background-color 0.3s, border-color 0.3s
                            padding 0 6px
                            width 30px
                            height 16px
                            line-height 16px
                            color #fff
                            position absolute
                            top 50%
                            right 10px
                            transform translateY(-50%)
                            &.off
                                background #fff
                                .switch_text
                                    float right
                                    color #ddd
                            &.on
                                background #02a774
                            >.switch_circle
                                // transform translateX(27px)
                                position absolute
                                top -1px
                                left -1px
                                width 16px
                                height 16px
                                border 1px solid #ddd
                                border-radius 50%
                                background #fff
                                box-shadow 0 2px 4px 0 rgba(0, 0, 0, 0.1)
                                transition transform 0.3s
                                &.run_circle
                                    transform translateX(27px)
                    .login_hint
                        margin-top 12px
                        color #999
                        font-size 14px
                        line-height 20px
                        >a
                            color #02a774
                .login_submit
                    display block
                    width 100%
                    height 42px
                    margin-top 30px
                    border-radius 4px
                    background #4cd96f
                    color #fff
                    text-align center
                    font-size 16px
                    line-height 42px
                    border 0
            .about_us
                display block
                font-size 12px
                margin-top 20px
                text-align center
                color #999
        .go_back
            position absolute
            top 5px
            left 5px
            width 30px
            height 30px
            >.iconfont
                font-size 20px
                color #999
</style>
