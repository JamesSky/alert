/*
 * @Author: shangyun.si
 * @Date: 2020-07-06 12:24:52
 * @Last Modified by: shangyun.si
 * @Last Modified time: 2020-07-06 13:10:22
 */

const { bizNotify, } = require('../biz');

const send = async ctx => {
  const names = await bizNotify.getWarningData();
  const res = await bizNotify.dingTalkMsg({
    'msgtype': 'text',
    'text': {
      'content': `7组本周未做作业伙伴：${names.join(',')}`,
    },
    'at': {
      // 'isAtAll': true,
    },
  });
  ctx.body = res;
};

const index = async ctx => {
  await ctx.render('index');
};
module.exports = {
  send,
  index,
};
