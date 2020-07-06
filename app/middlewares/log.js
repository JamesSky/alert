/*
 * @Author: shangyun.si
 * @Date: 2020-07-06 12:21:27
 * @Last Modified by: shangyun.si
 * @Last Modified time: 2020-07-06 12:24:07
 */

// https://github.com/posquit0/koa-rest-api-boilerplate

'use strict';

const bunyan = require('bunyan');
const { myType, } = require('../common/utils');
const assert = require('assert');

function reqSerializer (ctx = {}) {
  return {
    method: ctx.method,
    path: ctx.path,
    headers: ctx.headers,
    rawBody: ctx.request.rawBody,
  };
}

function resSerializer (ctx = {}) {
  return {
    statusCode: ctx.status,
    responseTime: ctx.responseTime,
  };
}

/**
 * Return middleware that attachs logger to context and
 * logs HTTP request/response.
 *
 * @param {Object} options={} - Optional configuration.
 * @param {Object} options.logger - Logger instance of bunyan.
 * @return {function} Koa middleware.
 */
function log (options = {}) {
  const { logger = null, } = options;

  assert.ok(myType(logger) === 'object', new TypeError('Logger required'));

  return async (ctx, next) => {
    const startTime = new Date();
    ctx.log = logger.child({ reqId: ctx.reqId, });
    ctx.log.addSerializers({
      req: reqSerializer,
      res: resSerializer,
      err: bunyan.stdSerializers.err,
    });

    ctx.log.info({ req: ctx, event: 'request', }, ` <<<=== req start - id: ${ctx.reqId}`);

    try {
      await next();
    } catch (err) {
      throw err;
    }

    ctx.responseTime = new Date() - startTime;
    ctx.log.info(
      {
        req: ctx,
        res: ctx,
        event: 'response',
      },
      ` ===>>> res ok done - id: ${ctx.reqId}`
    );
  };
}

module.exports = log;
