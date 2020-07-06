/*
 * @Author: shangyun.si
 * @Date: 2020-07-06 12:47:08
 * @Last Modified by:   shangyun.si
 * @Last Modified time: 2020-07-06 12:47:08
 */

// https://github.com/posquit0/koa-rest-api-boilerplate

'use strict';

// const Log = console;
/**
 * HTTP Status codes
 */
const statusCodes = {
  CONTINUE: 100,
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  REQUEST_TIMEOUT: 408,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIME_OUT: 504,
};

// TODO 业务错误码列表
// 10000: 系统错误码
// ...
// 20000: 成功
// ...
// 20001: 参数错误
// ...
// 40000: 缓存错误
// ...
// 50000: DB错误
// ...
// 60000: 文件错误

function responseHandler () {
  return async (ctx, next) => {
    ctx.res.statusCodes = statusCodes;
    ctx.statusCodes = ctx.res.statusCodes;

    ctx.res.fail = ({ statusCode, code, data = null, message = null, }) => {
      if (!!statusCode && statusCode >= 400 && statusCode < 500) ctx.status = statusCode;
      else if (!(ctx.status >= 400 && ctx.status < 500)) ctx.status = statusCodes.BAD_REQUEST;
      ctx.body = { code, data, message, };
    };

    ctx.res.ok = msg => {
      ctx.status = statusCodes.OK;
      const data = ctx.body;
      const message = msg || 'success';
      ctx.body = { code: 20000, data, message, };
    };

    await next();
  };
}

module.exports = responseHandler;