'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 引入中间件
  const jwt = app.middleware.jwt({app})

  router.get('/', controller.home.index);
  router.get('/user/info', jwt, controller.usr.info)
  router.get('/user/captcha', controller.usr.captcha)
  router.post('/user/register', controller.usr.create)
  router.post('/user/login', controller.usr.login)
};
