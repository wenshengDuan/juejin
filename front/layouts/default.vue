<template>
  <el-container>
    <el-header>
      <el-menu mode="horizontal" >
        <el-menu-item index="1">
          <img src="/juejin-logo.png" alt="" class='logo'>
        </el-menu-item>

        <el-menu-item index='2'>
          <nuxt-link to="/">首页</nuxt-link>
        </el-menu-item>

        <el-menu-item index="5" class="pull-right">
          <nuxt-link :to="`/user/${userinfo._id}`">{{userinfo.nickname}}</nuxt-link>
        </el-menu-item>

        <el-menu-item v-if="!userinfo._id" index='3' class="pull-right">
          <nuxt-link to="/login">登录</nuxt-link>
        </el-menu-item>
        
        <el-menu-item v-if="!userinfo._id" index='4' class="pull-right">
          <nuxt-link to="/register">注册</nuxt-link>
        </el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <nuxt />
    </el-main>

    <el-footer>
    </el-footer>
  </el-container>
</template>

<script>
import { mapState } from "vuex"
  export default {
    computed: {
      // ...mapState({
      //   userinfo: 'user'
      // })
      userinfo() {
        return this.$store.state.user
      }
    }
  }
</script>
<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

/* .button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
} */
.logo{
  height: 70%;
}
.pull-right{
  float: right !important;
}
</style>
