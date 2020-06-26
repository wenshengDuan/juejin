'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/userinfo', controller.usr.info)
  router.get('/user/captcha', controller.usr.captcha)
  router.post('/user/register', controller.usr.create)
};
