<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on:loginWay}" @click="loginWay = true">短信登录</a>
          <a href="javascript:;" :class="{on:!loginWay}" @click="loginWay = false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent = 'login'>
          <div :class="{on:loginWay}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button :disabled="!checkPhoneNumber" class="get_verification" :class="{right_phone:checkPhoneNumber}" @click.prevent="countDown">
                {{countTime?`已发送(还剩${countTime}s)`:'获取验证码'}}
              </button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:!loginWay}">
            <section >
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input type="text" maxlength="8" placeholder="密码" v-if="showPwd" v-model="pwd">
                <input type="password" maxlength="8" placeholder="密码" v-else v-model="pwd">
                <div class="switch_button" :class="showPwd?'on':'off'" @click="showPwd=!showPwd">
                  <div class="switch_circle" :class="{right:showPwd}"></div>
                  <span class="switch_text">{{showPwd?'adc':'...'}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha" @click="getCaptcha" ref="captcha">
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
    <AlertTip :alertText="alertText" @closeTip="closeTip" v-show="showAlert"></AlertTip>
  </section>
</template>

<script>
import AlertTip from '../../components/AlertTip/AlertTip'
import { getMessageCaptcha, login, loginByPhone } from '../../api/index'
export default {
  data () {
    return {
      loginWay: true, // true为短信登陆,false为密码登陆
      countTime: 0, // 倒计时时间
      phone: '', // 电话号码
      showPwd: true,
      pwd: '', // 密码
      code: '', // 短信验证码
      name: '', // 用户名
      captcha: '', // 图形验证码
      alertText: '', // 提示框文本
      showAlert: '' // 是否展示提示框
    }
  },
  components: {
    AlertTip
  },
  computed: {
    // 检测手机号码合法性
    checkPhoneNumber () {
      return /^1\d{10}$/.test(this.phone)
    }
  },
  methods: {
    // 获取短信验证码,开启倒计时
    async countDown () {
      if (this.countTime === 0) {
        this.countTime = 30
        this.intervalID = setInterval(() => {
          this.countTime--
          if (this.countTime === 0) {
            clearInterval(this.intervalID)
          }
        }, 1000)
      }
      const result = await getMessageCaptcha(this.phone)
      if (result.code === 1) {
        // 获取失败的情况，显示失败信息
        this.alertShow(result.msg)
        // 停止计时
        if (this.countTime) {
          this.countTime = 0
          clearInterval(this.intervalID)
          this.intervalID = null
        }
      }
    },
    alertShow (alertText) {
      this.showAlert = true
      this.alertText = alertText
    },
    closeTip () {
      this.showAlert = false
      this.alertText = ''
    },
    // 获取图形验证码
    getCaptcha (event) {
      this.$refs.captcha.src = 'http://localhost:4000/captcha?time=' + Date.now()
    },
    // 前台表单验证
    async login () {
      let result
      if (this.loginWay) { // 短信登陆
        const { checkPhoneNumber, phone, code } = this
        if (!phone) {
          this.alertShow('必须输入手机号码')
          return
        } else if (!checkPhoneNumber) {
          this.alertShow('手机号码不正确')
          return
        } else if (!/^\d{6}$/.test(code)) {
          // 手机验证码不正确
          this.alertShow('手机验证码不正确')
          return
        }
        // 发送ajax请求短信登陆
        result = await loginByPhone(phone, code)
      } else { // 密码登录
        const { pwd, name, captcha } = this
        if (!name) {
          // 用户名不正确
          this.alertShow('用户名不正确')
          return
        } else if (!pwd) {
          // 密码不正确
          this.alertShow('密码不正确')
          return
        } else if (!captcha) {
          // 图形验证码不正确
          this.alertShow('图形验证码不正确')
          return
        }
        // 发送ajax请求用户密码登陆
        result = await login(name, pwd, captcha)
      }
      // 停止计时器
      if (this.countTime) {
        this.countTime = 0
        clearInterval(this.intervalID)
        this.intervalID = null
      }
      if (result.code === 0) {
        const user = result.data
        // 将user保存到vuex的state中
        this.$store.dispatch('reqUserInfo', user)
        // 跳转到个人中心页
        this.$router.replace('/personal')
      } else {
        this.getCaptcha()
        const msg = result.msg
        this.alertShow(msg)
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixins.styl'
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
                &.right_phone
                  color black
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
                transition background-color .3s,border-color .3s
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
                  //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(30px)
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
