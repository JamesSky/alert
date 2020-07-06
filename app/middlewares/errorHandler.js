/*
 * @Author: shangyun.si
 * @Date: 2020-07-06 12:48:55
 * @Last Modified by: shangyun.si
 * @Last Modified time: 2020-07-06 12:49:39
 */

'use strict';
// const Log = console;
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

/**
 * 先错误处理再格式化返回
 * err.bcode 定义业务错误码
 * @returns md
 */
function errorHandler () {
  return async (ctx, next) => {
    // httpStatusCode 为 200【强制】并且是 API 前缀的 统一封装成 业务码形式
    try {
      await next();
      if (
        (ctx.status === 200)
      ) {
        ctx.res.ok();
      }
    } catch (err) {
      let flag = false;
      if (/SyntaxError: Unexpected token .* in JSON/.test(err.message)) flag = true;
      if (flag) {
        ctx.res.ok({
          statusCodes: 200,
          code: 60000,
          message: err.message,
          data: err,
        });
        return;
      }
      ctx.res.fail({ statusCode: 200, code: err.bcode || 50000, message: err.message, data: err.data, });
    }
  };
}

module.exports = errorHandler;
