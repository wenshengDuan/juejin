import Vue from 'vue'
import axios from 'axios'
import {MessageBox} from "element-ui"

let service = axios.create({
  timeout: 5000,
  baseURL: '/api'
})

export default ({store, redirect}) => {

  // @设置请求拦截器, 用于token鉴权 路由跳转
  service.interceptors.request.use(
    config => {
      // token管理
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
      if (data.code === -999) {
        MessageBox.confirm('登录已过期', '过期', {
          confirmButtonText: '登录',
          showCancelButton: false,
          type: "warning"
        }).then(() => {
          // 删除数据 
          window.localStorage.removeItem('token')
          // 重定向到登录页面
          redirect({path: '/login'})
        })
      }
      return data
    }
  )
}


Vue.prototype.$http = service

export const http = service