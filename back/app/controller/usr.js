'use strict';

const Controller = require('./base');

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

  // 用户注册
  async create() {
    const { ctx } = this
    const { captcha } = ctx.request.body

    if (captcha.toUpperCase() === ctx.session.captcha.toUpperCase()) {
      this.success('新增成功')
    } else {
      this.error('验证码错误')
    }
  }
}

module.exports = UsrController;
