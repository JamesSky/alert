/*
 * @Author: shangyun.si
 * @Date: 2020-07-06 11:54:11
 * @Last Modified by: shangyun.si
 * @Last Modified time: 2020-07-06 12:19:28
 */
/* eslint-disable security/detect-child-process */

'use strict';

const pkginfo = require('../../package.json');
const { env, } = require('../config');
let iphtml;

/**
 * @swagger
 * /document/info:
 *   get:
 *     tags:
 *       - notUse
 *     summary: __请忽略__ 获取API文档信息.
 *     operationId: getDocumentInfo
 *     responses:
 *       name:
 *         description: 项目名称
 *       version:
 *         description: 版本号
 *       description:
 *         description: 项目描述
 *       author:
 *         description: 项目作者
 */
exports.getApiInfo = async ctx => {
  const data = {
    name: pkginfo.name,
    version: pkginfo.version,
    description: pkginfo.description,
    author: pkginfo.author,
    env,
    apolloConf: global.apolloConf || '',
    serverip: iphtml && iphtml[0],
    // clientip: ctx.ip,
  };
  ctx.body = data;
};
