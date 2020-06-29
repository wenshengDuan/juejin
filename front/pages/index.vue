<template>
  <div class="container">
    <div>
      <!-- <logo /> -->
      {{$store.state}}
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
// import { createNamespacedHelpers } from "vuex"
// const { mapMutations, mapActions } = createNamespacedHelpers('user')
import { mapActions, mapMutations } from "vuex"
export default {
  async mounted() {
    const token = window.localStorage.getItem("token")
    // const token = this.$store.state.user.token
    if (token) {
      // let ret = await this.$http.get('/user/info')
      // console.log(ret)
      
      // 模块直接调用方式
      // this.$store.commit('user/SET_TOKEN', token)
      
      // 基于命名空间的辅组函数调用方式
      // this.SET_TOKEN(token) 
      
      // 全局辅助函数调用方式
      this.setToken(token)
      this.getUserDetail()
      // this.$store.dispatch('user/detail')
    }
  },

  components: {
    // Logo
  },
  methods: {
    ...mapMutations({
      setToken: 'user/SET_TOKEN'
    }),
    ...mapActions({
      getUserDetail: 'user/detail'
    })
    // ...mapMutations(['SET_TOKEN'])
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
