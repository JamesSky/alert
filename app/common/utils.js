/*
 * @Author: shangyun.si
 * @Date: 2020-07-06 11:51:27
 * @Last Modified by: shangyun.si
 * @Last Modified time: 2020-07-06 12:24:22
 */

/**
 * 判断输入数据类型
 * @param {any} params
 */
const myType = params => {
  let ty = 'undefined';
  ty = Object.prototype.toString.call(params);

  let res = {
    '[object Object]': 'object',
    '[object Array]': 'array',
    '[object String]': 'string',
    '[object Null]': 'null',
    '[object Number]': 'number',
    '[object Undefined]': 'undefined',
    '[object Function]': 'function',
    '[object AsyncFunction]': 'function',
    '[object AsyncGeneratorFunction]': 'function',
    '[object GeneratorFunction]': 'function',
    '[object Boolean]': 'boolean',
    '[object Date]': 'date',
  };
  if (res[ty] !== 'number') return res[ty];
  return (
    {
      Infinity: 'infinity',
      NaN: 'nan',
    }[params.toString()] || res[ty]
  );
};

/**
 * 判断是否是空数据 {}, [], Null, '', undefind, Boolean
 * @param {*} obj any
 */
const isEmpty = obj => {
  let type = myType(obj);
  // 约定：传入boolean类型，说明实际是有值的
  if (type === 'boolean') return false;
  if (type === 'string') return obj.length === 0;
  if (type === 'nan') return true;
  if (type === 'array') return obj.length === 0;
  if (type === 'object') return Object.keys(obj).length === 0;
  if ([ 'date', 'html', 'browser', 'number', 'infinity', 'function', ].includes(type)) return false;
  if (!obj) return true;
  // return false;
};

module.exports = {
  isEmpty,
  myType,
};
