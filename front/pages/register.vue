<template>
  <div class="login-container">
    <el-form class="login-form" ref="form" :model="form" :rules="rules">
      <div class="title-container">
        <img src="/juejin-logo.png" alt="">
      </div>
      
      <!-- 邮箱 -->
      <el-form-item prop="email">
        <span class="svg-container">
          <i class="el-icon-mobile"></i>
        </span>
        <el-input
          v-model="form.email"
          placeholder="请输入邮箱"
        ></el-input>
      </el-form-item>

      <!-- 验证码 -->
      <el-form-item prop="captcha" class="email-code">
        <div class="send-email-btn">
          <img @click="resetCaptcha" :src="code.captcha" alt="">
        </div>
        <span class="svg-container">
          <i class="el-icon-user"></i>
        </span>
        <el-input
          ref="captcha"
          v-model="form.captcha"
          placeholder="请输入验证码"
        ></el-input>
      </el-form-item>

      <!-- 注册按钮 -->
      <el-button 
        type="primary" 
        class="register-button" 
        @click.native.prevent="handleRegister"
      >
        注册
      </el-button>
    </el-form>
  </div>
</template>

<script>
import { log } from 'util'
  export default {
    layout: 'login',
    data() {
      return {
        form: {
          email: '824201954@qq.com',
          captcha: ''
        },
        rules: {
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
          ],
          captcha: [
            { required: true, message: '请输入验证码', trigger: 'blur' } 
          ]
        },
        code: {
          captcha: '/api/user/captcha' 
        }
      }
    },
    methods: {
      resetCaptcha() {
        this.code.captcha = `/api/user/captcha?_t=${new Date().getTime()}`
      },
      handleRegister() {
        this.$refs.form.validate(valide => {
          if (valide) {
              this.$http.post('/user/register', this.form)
              .then ( res => {
                console.log('/user/register', res)
                const { code } = res
                if (code === 0) {
                  this.$message.success(res.data)
                } else {
                  this.$message.error(res.message)
                }
              })
          }
        } )
      }
    }
  }
</script>

<style lang="scss" scoped>
.email-code{
  width:340px;
  position: relative;
  .send-email-btn{
    position: absolute;
    right:-110px;
    img{
      width:90px;
      height:50px;
      cursor: pointer;
    }
  }
}
.register-button{
  width: 100%;
  height: 50px;
}
</style>