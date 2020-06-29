const { http } = require("../plugins/axios")

const state = () => ({
  email: '',
  nickname: '',
  avatar: '',
  _id: '',
  token: ''
})

const mutations = {
  SET_USER(state, data){
    state.email = data.email 
    state.nickname = data.nickname 
    state.avatar = data.avatar
    state._id = data._id
  },
  SET_TOKEN(state, token) {
    state.token = token
    console.log('state.token', state.token)
  }
}

const actions = {
  // 登录接口
  login: async ({commit}, data) => {
    const ret = await http.post('/user/login', data)
    if (ret.code === 0) {
      window.localStorage.setItem('token', ret.data.token)
      commit('SET_TOKEN', ret.data.token)
    }

    return ret
  },

  detail: async ({commit}) => {
    const ret = await http.get('/user/info')
    if (ret.code === 0) {
      commit('SET_USER', ret.data)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}