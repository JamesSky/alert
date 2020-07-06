/*
 * @Author: shangyun.si
 * @Date: 2020-07-06 11:52:47
 * @Last Modified by:   shangyun.si
 * @Last Modified time: 2020-07-06 11:52:47
 */

'use strict';
module.exports = () => {
  return async function (ctx, next) {
    let rawData = ctx.request.body;
    try {
      if (typeof rawData === 'string' && rawData.length) rawData = JSON.parse(rawData);
      ctx.log.info({ req: ctx, event: 'request', }, `ctx.request.body is raw data(${Number(rawData.length)})`);
    } catch (error) {
      ctx.log.warn({ req: ctx, event: 'request', }, `JSON.parse req.body error ${error}`);
    }
    const reqParam = {
      // headers: {},
      router: ctx.params,
      query: ctx.query,
      body: rawData,
      files: ctx.request.files,

      // 兼容 swagger 测试 curl 发送的请求, https://swagger.io/docs/specification/describing-request-body/
      // 并去除其他属性，防止报错：Cannot convert object to primitive value
      // swagger 没有用 -d 发送 body 数据
      merge: Object.assign(JSON.parse(JSON.stringify(ctx.query)), rawData),
      // 需要修改 swagger curl POST 请求 发送方式如下：
      // curl --header "Content-Type: application/json" \
      // --request POST \
      // --data '{"urlOrigin":"..."}' \
      // http://0.0.0.0:5000/api/url
      // 简写 ： (-H : --header, -d : --data)
    };

    ctx.reqParam = reqParam;
    return next();
  };
};
