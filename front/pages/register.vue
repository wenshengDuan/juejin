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
          placeholder="邮箱"
        ></el-input>
      </el-form-item>

      <!-- 昵称 -->
      <el-form-item prop="nickname">
        <span class="svg-container">
          <i class="el-icon-chat-round"></i>
        </span>
        <el-input
          v-model="form.nickname"
          placeholder="昵称"
        ></el-input>
      </el-form-item>

      <!-- 密码 -->
      <el-form-item prop='password'>
        <span class="svg-container">
          <i class="el-icon-lock"></i>
        </span>

        <el-input
          v-model="form.password"
          placeholder="密码"
          type="password"
        ></el-input>
      </el-form-item>

      <!-- 确认密码 -->
      <el-form-item prop="repassword">
        <span class="svg-container">
          <i class="el-icon-lock"></i>
        </span>

        <el-input
          v-model="form.repassword"
          placeholder="请再次输入密码"
          type="password"
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
          v-model="form.captcha"
          placeholder="验证码"
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
import md5 from "md5"
import { log } from 'util'
  export default {
    layout: 'login',
    data() {
      const checkPassword = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入密码'))
        } else {
          if (this.form.repassword !== '') {
            this.$refs.form.validateField('repassword')
          }

          callback()
        }
      }

      const checkPassword2 = (rule, value, callback) => {
        console.log('checkpassword2')
        if (!value) {
          return callback(new Error('请再次输入密码'))
        } else if (this.form.password !== value) {
          return callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      }

      return {
        form: {
          email: '824202954@qq.com',
          nickname: '吾妻同行',
          password: '123456',
          repassword: '123456',
          captcha: ''
        },
        rules: {
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
          ],
          nickname: [
            { required: true, message: '请输入昵称', trigger: 'blur' }
          ],
          password: [
            // { required: true, message: '请输入密码', trigger: 'blur' }
            { validator: checkPassword, trigger: 'blur' }
          ],
          repassword: [
            // { required: true, message: '请再次输入密码', trigger: 'blur' }
            { validator: checkPassword2, trigger: 'blur' }
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
            const data = {
              email: this.form.email,
              nickname: this.form.nickname,
              password: md5(this.form.password),    
              captcha: this.form.captcha        
            }

            this.$http.post('/user/register', data)
              .then ( res => {
                console.log('/user/register', res)
                const { code } = res
                if (code === 0) {
                  // 注册成功跳转登录页
                  this.$message.success(res.data)
                  this.$router.push({path: '/login'})
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