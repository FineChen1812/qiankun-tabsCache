class Cache {
  constructor(){
    this.loadedMicroApp = new Map()
  }

  dealCache(instance, key){
    return new Promise((resolve, reject) => {
      const needCached = this.getCache(key) || instance
      const cachedInstance = {}
      cachedInstance._vnode = needCached._vnode
      if(!cachedInstance._vnode.data.keepAlive)cachedInstance._vnode.data.keepAlive = true
      this.loadedMicroApp.set(key, cachedInstance)
      instance.$destroy()
      resolve()
    })
  }
  
  getCache(key){
    return this.loadedMicroApp.get(key)
  }
  
  delCache(key){
    this.loadedMicroApp.delete(key)
  }
}
 export default Cache