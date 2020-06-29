'use strict';

const Controller = require('./base');
const md5 = require('md5')

const HashSalt = 'beijin@123!#321'

class UsrController extends Controller {
  async info() {
    this.success({
      name:'舒展'
    })
  }

  async captcha() {
    // console.log(this.service.tools)
    const captcha = this.service.tools.captcha()
    //设置session，保存验证码信息
    this.ctx.session.captcha = captcha.text
    // 设置响应格式
    this.ctx.response.type = "image/svg+xml"
    this.ctx.body = captcha.data
  }

  // 验证邮箱
  async checkEmail(email) {
    const user = this.ctx.model.User.findOne({email})
    return user
  }

  // 验证昵称
  async checkNickname(nickname) {
    const user = this.ctx.model.User.findOne({nickname})
    return user
  }

  用户登录
  async login() {
    const {ctx, app} = this
    const {email, password} = ctx.request.body

    // 验证用户名密码
    const user = await ctx.model.User.findOne({
      email,
      password: md5(password + HashSalt)
    })

    if (user) {
      // 验证成功，返回token
      const { nickname } = user
      const token = app.jwt.sign({
        email,
        nickname,
        _id: user._id
      }, app.config.jwt.session, {
        expiresIn: '60s' 
      })

      this.success({email, nickname, token})
    } else {
      this.error('登录失败')
    }
  }

  // 用户注册
  async create() {
    const { ctx } = this
    const { email, nickname, password, captcha } = ctx.request.body

    if (captcha.toUpperCase() === ctx.session.captcha.toUpperCase()) {
      
      // 新增之前确认邮箱验证码是否重复
      if(await this.checkEmail(email)){
        return this.error('邮箱重复了')
      }
      
      if (await this.checkNickname(nickname)) {
        return this.error('昵称重复了')
      }
      
      //否则新增
      const ret = await ctx.model.User.create({
        email,
        nickname,
        // 密码再次加盐加密
        password: md5(password + HashSalt)
      })
      
      if (ret._id) {
        this.success('新增成功')
      } else {
        this.error('新增失败')
      }
      
    } else {
      this.error('验证码错误')
    }
  }
}

module.exports = UsrController;
