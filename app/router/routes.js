/*
 * @Author: shangyun.si
 * @Date: 2020-07-06 12:25:07
 * @Last Modified by: shangyun.si
 * @Last Modified time: 2020-07-06 12:44:22
 */
const { ctlNotify, ctlSpec, } = require('../controllers');
const routeArray = [
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
