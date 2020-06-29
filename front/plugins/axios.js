import Vue from 'vue'
import axios from 'axios'

let service = axios.create({
  timeout: 5000,
  baseURL: '/api'
})

// @设置请求拦截器, 用于token鉴权 路由跳转
service.interceptors.request.use(
  config => {
    // 做token管理
    const token = window.localStorage.getItem('token')
    config.headers.common['Authorization'] = "Bearer " + token
    return config
  },
 err => {
  return Promise.reject(err)
})

//@设置响应拦截器
service.interceptors.response.use(
  response => {
    const { data }  = response
    return data
  }
)

Vue.prototype.$http = service

export const http = service