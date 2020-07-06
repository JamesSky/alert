/*
 * @Author: shangyun.si
 * @Date: 2020-07-06 11:04:10
 * @Last Modified by: shangyun.si
 * @Last Modified time: 2020-07-06 12:25:30
 */

const Koa = require('koa');
const compose = require('koa-compose');
const MD = require('./middlewares/');
const { port, host, env, } = require('./config');

const app = new Koa();

app.proxy = true;
app.use(compose(MD));

const Log = console;

function onError (err, ctx) {
  if (err.bcode) {
    Log.warn({ err, event: 'error', }, `业务错误码 ${err.bcode}`, ctx.response);
  } else {
    Log.error('\n===未捕获的错误=== ', err);
  }
  // TODO XHR 兼容
  // if (ctx) { ctx.body = err; }
}

app.on('error', onError);

if (!module.parent) {
  const server = app.listen(port, host, () => {
    Log.info({ event: 'execute', }, `API server listening on ${host}:${port}, in ${env}`);
  });
  server.on('error', onError);
}

module.exports = {
  app,
  onError,
};
