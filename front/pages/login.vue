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

      <!-- 注册按钮 -->
      <el-button 
        type="primary" 
        class="register-button" 
        @click.native.prevent="handleLogin"
      >
        登录
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
      return {
        form: {
          email: '824202954@qq.com',
          password: '123456',
        },
        rules: {
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        },
      }
    },
    methods: {
      handleLogin() {
        this.$refs.form.validate(valide => {
          if (valide) {
            const data = {
              email: this.form.email,
              password: md5(this.form.password),        
            }

            this.$http.post('/user/login', data)
              .then ( res => {
                console.log('/user/login', res)
                const { code } = res
                if (code === 0) {
                  this.$notify({
                    title: '登录成功',
                    type: 'success'
                  })
                  // 存储token
                  window.localStorage.setItem('token', res.data.token)
                  // 跳转首页
                  setTimeout(() => {
                    this.$router.push('/')
                  }, 1000);
                  
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