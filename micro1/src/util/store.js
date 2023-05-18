const keyName = 'qiankun' + '-';
/**
* 存储localStorage
*/
export const setStore = (params = {}) => {
  let { name, content} = params;
  name = keyName + name
  let obj = {
      dataType: typeof (content),
      content: content,
      datetime: new Date().getTime()
  }
  window.localStorage.setItem(name, JSON.stringify(obj))
}
/**
* 获取localStorage
*/

export const getStore = (params = {}) => {
  let {name} = params
  name = keyName + name
  let obj = {},content;
  obj = window.localStorage.getItem(name);
  if (!obj) return;
  try {
      obj = JSON.parse(obj);
  } catch{
      return obj;
  }
  if (obj.dataType == 'string') {
      content = obj.content;
  } else if (obj.dataType == 'number') {
      content = Number(obj.content);
  } else if (obj.dataType == 'boolean') {
      content = eval(obj.content);
  } else if (obj.dataType == 'object') {
      content = obj.content;
  }
  return content;
}
/**
* 删除localStorage
*/
export const removeStore = (params = {}) => {
  let {
      name,
      type
  } = params;
  name = keyName + name
  if (type) {
      window.sessionStorage.removeItem(name);
  } else {
      window.localStorage.removeItem(name);
  }

}

/**
* 获取全部localStorage
*/
export const getAllStore = (params = {}) => {
  let list = [];
  let {
      type
  } = params;
  if (type) {
      for (let i = 0; i <= window.sessionStorage.length; i++) {
          list.push({
              name: window.sessionStorage.key(i),
              content: getStore({
                  name: window.sessionStorage.key(i),
                  type: 'session'
              })
          })
      }
  } else {
      for (let i = 0; i <= window.localStorage.length; i++) {
          list.push({
              name: window.localStorage.key(i),
              content: getStore({
                  name: window.localStorage.key(i),
              })
          })

      }
  }
  return list;
}

/**
* 清空全部localStorage
*/
export const clearStore = () => {
    window.localStorage.clear()
}