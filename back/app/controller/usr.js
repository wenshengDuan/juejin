'use strict';

const Controller = require('./base');

class UsrController extends Controller {
  async info() {
    this.success({
      name:'舒展'
    })
  }
}

module.exports = UsrController;
