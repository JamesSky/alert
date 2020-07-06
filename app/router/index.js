/*
 * @Author: shangyun.si
 * @Date: 2020-07-06 11:43:41
 * @Last Modified by: shangyun.si
 * @Last Modified time: 2020-07-06 11:48:04
 */

'use strict';

const Router = require('koa-router');
const routes = require('./routes');
// const schemas = require('../schema'); // 参数校验
const paramValidator = require('../middlewares/paramsValidator');
const router = new Router();
const Log = console;

// schemas.init();

routes.forEach(item => {
  let { method, controller, auth, type, } = item;
  method = method || 'all';
  type = type || 'a';
  auth = +!!auth;

  if (!controller) {
    Log.error('\n\n', new Error(`请检查 ${item.path} controller 方法是否遗漏`));
    // 不影响其他
    return true;
  }
  let prePath = item.path;

  global.allRoute = global.allRoute || {};
  global.allRoute[prePath] = { type, auth, method, };
  router[method](prePath, paramValidator(controller.paramSchema), controller);
});

module.exports = router;
