import { loadMicroApp } from 'qiankun'
import {microAppConfig} from "./register"
import store from "@/store"

// 查找当前页签是否是微应用下的页面
export function isMicroApp(path) {
  return !!microAppConfig.some(item => {
    return path.startsWith(item.activeRule)
  })
}
// 查找当前页签是否是微应用下的页面，并返回对应微应用配置项
export function findMicroAppByPath(path) {
  return microAppConfig.find(item => {
      let activeRule = item.activeRule
      return path.startsWith(activeRule)
  })
}

export function createMicroApp(path) {
  return new Promise((resolve, reject) => {
      const loadedMicroApps = { ...store.state.loadedMicroApps } // 已手动挂载的微应用对象
      if (!isMicroApp(path)) {
          // 非微应用直接跳转
          resolve()
          return
      }
      // 微应用跳转处理
      // 1.判断是否已手动加载，是则直接跳转，否则先手动挂载，再跳转
      const microAppResult = findMicroAppByPath(path) // 是否是微应用的跳转
      if (Object.prototype.hasOwnProperty.call(loadedMicroApps, microAppResult.name)) {
          resolve()
          return
      }
      try {
          loadedMicroApps[microAppResult.name] = loadMicroApp(microAppResult) // 加载微应用
          store.dispatch('setLoadedMicroApps', loadedMicroApps)
          resolve()
      } catch (err) {
          reject(err)
          console.log(err)
      }
  })
}