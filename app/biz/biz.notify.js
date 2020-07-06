const axios = require('axios');
const { list, userlist, } = require('../config');
// // 参考地址：https://developer.github.com/v3/issues/comments/
// const getList = () => {
//   const listAll = [];
//   let page = 1;
//   const getAllCommitRes = async (page) => {
//     try {
//       const gitRes = await axios({
//         method: 'GET',
//         url: `https://api.github.com/repos/GeekUniversity/Frontend-02-Template/issues/1/comments?page=${page}`,
//         headers: {
//           'Authorization': 'token 70d9f8ab315f8d873fe0e8804317ad3341fff7db',
//         },
//       });
//       return gitRes.data;
//     } catch (error) {}
//   };
//   return new Promise(async (resolve, reject) => {
//     try {
//       const _rest = await getAllCommitRes(page);
//       if (_rest.length < 30) {
//         listAll.push(_rest);
//         resolve(listAll);
//       } else {
//         listAll.push(await getAllCommitRes(page++));
//       }
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

const getWarningData = async () => {
  try {
    const task = list.map(item => item.body);
    const idList = task.map(item => {
      const _item = item.split('\r\n').filter(item => item.indexOf('#学号') !== -1)[0];
      return _item.split(':')[1];
    }).filter(item => item);
    return userlist.filter(item => !idList.includes(item.id)).map(item => item.user);
  } catch (error) {}
};

const dingTalkMsg = async (data) => {
  const dingdingRes = await axios({
    method: 'POST',
    url: 'https://oapi.dingtalk.com/robot/send?access_token=fb0e78e9e01a08193a2044c625f739e1fb6ec4ffb00e508e961b8d904619df88',
    data,
  });
  return dingdingRes.data;
};

module.exports = {
  dingTalkMsg,
  getWarningData,
};
