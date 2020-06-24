<template>
  <div class="login-container">
    <el-form class="login-form" ref="form" :model="form" :rule="rules">
      <div class="title-container">
        <img src="/juejin-logo.png" alt="">
      </div>

      <el-form-item prop="email">
        <span class="svg-container">
          <i class="el-icon-mobile"></i>
        </span>
        <el-input
          v-model="form.email"
          placeholder="请输入邮箱"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    layout: 'login',
    data() {
      return {
        form: {
          email: ''
        },
        rules: {
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
          ]
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>