/*
 * @Author: shangyun.si
 * @Date: 2020-07-06 12:25:07
 * @Last Modified by: shangyun.si
 * @Last Modified time: 2020-07-06 13:13:17
 */
const { ctlNotify, ctlSpec, } = require('../controllers');
const routeArray = [
  {
    method: 'get',
    path: '/',
    type: 'p',
    controller: ctlNotify.index,
  },
  {
    method: 'get',
    path: '/dingding',
    controller: ctlNotify.send,
  },
  {
    method: 'get',
    path: '/document/info',
    controller: ctlSpec.getApiInfo,
  },
];

module.exports = routeArray;
