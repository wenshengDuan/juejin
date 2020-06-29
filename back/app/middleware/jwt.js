module.exports =  ({app}) => {
  return async function verify(ctx, next) {
    // 获取token
    const token = ctx.request.header.authorization.replace('Bearer ', '')
    // 解密token
    try {
      const ret = app.jwt.verify(token, app.config.jwt.secret)
      console.log('中间件解密token信息：', ret)
      // 提取信息到全局
      ctx.state.email = ret.email
      ctx.state.userid = ret._id
      await next()
    }
    catch(err) {
      if (err.name === "TokenExpiredError") {
        // token过期 犯会错误码 重新登录
        return ctx.body = {
          code: -999,
          message: '登录过期'
        }
      }
      console.log('中间件错误：', err)
    }
  }
}