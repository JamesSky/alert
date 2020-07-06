/*
 * @Author: shangyun.si
 * @Date: 2020-07-06 12:24:57
 * @Last Modified by: shangyun.si
 * @Last Modified time: 2020-07-06 12:48:10
 */
const cors = require('@koa/cors');

const views = require('koa-views');
const serve = require('koa-static');
const koaBody = require('koa-bodyparser');

const { join, } = require('path');
const bunyan = require('bunyan');

const { host, port, } = require('../config');
const router = require('../router');
const logMiddleware = require('./log');
const loggerConfig = require('../config/logger.js');
const errorHandler = require('./errorHandler');
const responseHandler = require('./responseHandler');

/**
 * 格式化 from， text， json 数据
 */
const mdKoaBody = koaBody({
  enableTypes: [ 'json', 'form', 'text', ],
  textLimit: '2mb',
  formLimit: '1mb',
  jsonLimit: '5mb',
  // 如果为true，不解析GET,HEAD,DELETE请求
  strict: false,
  multipart: true,
  onerror: function (err, ctx) {
    ctx.throw(422, new Error(`body parse error: ${err}`), { bcode: 20011, });
  },
});

/**
 * 允许跨域
 */
const mdcors = cors({
  origin: '*',
  allowMethods: [ 'GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH', ],
  // exposeHeaders: [ 'X-Request-Id', ],
});

/**
 * 静态资源
 */
const mdAssets = serve(join(process.cwd(), 'public'));

/**
 * views
 */
const mdViews = views(join(__dirname, '..', 'views'), {
  extension: 'ejs',
});

/**
 * 日志处理中间件
 */
const mdLogger = logMiddleware({
  logger: bunyan.createLogger(
    Object.assign(
      {
        serializers: bunyan.stdSerializers,
        hostname: host + ':' + port,
        time: Date().toLocaleString(),
      },
      loggerConfig
    )
  ),
});

/**
 * res 格式化处理
 */
const mdResHandler = responseHandler();
/**
 * res 错误处理
 */
const mdErrorHandler = errorHandler();

/**
 * 路由
 */
const mdRouter = router.routes();
const mdRouterAllowed = router.allowedMethods();

module.exports = [
  mdAssets,
  mdViews,
  mdKoaBody,
  mdcors,
  mdLogger,
  mdResHandler,
  mdErrorHandler,
  mdRouter,
  mdRouterAllowed,
];
