import {microAppConfig} from "@/config/register"

export const diff = (obj1, obj2) => {
  delete obj1.close;
  var o1 = obj1 instanceof Object;
  var o2 = obj2 instanceof Object;
  if (!o1 || !o2) { /*  判断不是对象  */
    return obj1 === obj2;
  }

  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
    //Object.keys() 返回一个由对象的自身可枚举属性(key值)组成的数组,例如：数组返回下表：let arr = ["a", "b", "c"];console.log(Object.keys(arr))->0,1,2;
  }

  for (var attr in obj1) {
    var t1 = obj1[attr] instanceof Object;
    var t2 = obj2[attr] instanceof Object;
    if (t1 && t2) {
      return diff(obj1[attr], obj2[attr]);
    } else if (obj1[attr] !== obj2[attr]) {
      return false;
    }
  }
  return true;
}

// 查找当前页签是否是微应用下的页面
export function isMicroApp(path) {
  return !!microAppConfig.some(item => {
    return path.startsWith(item.activeRule.substring(1))
  })
}
// 查找当前页签是否是微应用下的页面，并返回对应微应用配置项
export function findMicroAppByPath(path) {
  return microAppConfig.find(item => {
    return path.startsWith(item.activeRule.substring(1))
  })
}