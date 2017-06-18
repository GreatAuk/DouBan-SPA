/**
 * 存储localStorage
 */
export const setStorage = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStorage = name => {
  if (!name) return;
  return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeStorage = name => {
  if (!name) return;
  window.localStorage.removeItem(name);
}

/**
 * 验证 email
 */
export const isEmail = (email) => {
  let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email);
}

/**
 * 验证是否是url
 */
export const isUrl = (url) => {
  let urlRegex = /^((http|https):\/\/(\w+:{0,1}\w*@)?(\S+)|)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
    return urlRegex.test(url);
}

/**
 * 验证是否是数字
 */
export const isNumber = (value) => {
  return typeof value === 'number' && !isNaN(value);
}

/**
 * 验证是否是整数
 */
export const isInteger = (value) => {
    return v.isNumber(value) && value % 1 === 0;
  },

  /**
   * 验证是否是数组
   */
  export const isArray = (value) => {
    return {}.toString.call(value) === '[object Array]';
  }

/**
 * 验证数组是否有重复的值
 */
export const unique = (array) => {
  if (!v.isArray(array)) {
    return array;
  }
  return array.filter(function (el, index, array) {
    return array.indexOf(el) == index;
  });
}
/**
 * 验证是否是空
 */
export const isEmpty = (value) => {
  if (value.lenght === 0) {
    return false;
  }
  let emptyRegex = /^\s*$/;
  return emptyRegex.test(value);
}

/**
 * 验证是否是时间对象
 */
export const isDate = (obj) => {
    return obj instanceof Date;
},
