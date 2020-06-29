'use strict';

/** @type Egg.EggPlugin */
// module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
// };

// 启用mongoose插件
exports.mongoose = {
  enable: true,
  package: 'egg-mongoose'
}

exports.jwt = {
  enable: true,
  package: 'egg-jwt'
}
