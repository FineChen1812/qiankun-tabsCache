class Cache {
  constructor(){
    this.loadedMicroApp = new Map()
  }

  dealCache(instance, key){
    return new Promise((resolve, reject) => {
      const needCached = this.getCache(key) || instance
      const cachedInstance = {}
      cachedInstance._vnode = needCached._vnode
      cachedInstance.routeCache = {
        $router: instance.$router,
        apps: [...instance.$router.apps],
        currentRoute: instance.$route.path
      }
      console.log(needCached, 'apps')
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