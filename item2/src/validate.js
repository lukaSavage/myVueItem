import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'
// 汉化包
import zh_CN from 'vee-validate/dist/locale/zh_CN'

Validator.locale === "en" ? "zh_CN" : "en";
Validator.localize(Validator.locale, {
    messages: zh_CN.messages,
    attributes: {
        phone: '手机号码',
        verification: '短信验证码',
        name: '用户名',    //用户名
        pwd: '密码',     //用户密码
        captcha: '图形验证码',  //图形验证码
        emailCaptcha: '短信验证码', //短信验证码
    }
});
// 新的扩展方法，只需要在span标签上添加v-validate="'required|phone'"即可使用
Validator.extend('phone', {
    // 这里的field就相当于之前的phone
    getMessage: (field) => `请输入正确的手机号码` + field,
    validate: (value) => {
        // const reg = /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
        return /^[1]\d{10}$/.test(value)

    }
});

Vue.use(VeeValidate)