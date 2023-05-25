import Vue from 'vue'
import App from './App.vue'
import { initRouter } from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false
Vue.use(ElementUI);

let instance = null, microName = ''
function render(props = {}, cacheNode) {
  const router = initRouter()
  const { container, name } = props
  microName = name
  if(cacheNode) router.apps = cacheNode.routeCache.apps
  instance = new Vue({
    router,
    store,
    render: cacheNode ? () => cacheNode._vnode : h => h(App),
  })
  instance.$mount(container ? container.querySelector("#micro1") : "#micro1") 
}
if (window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
} else {
  render()
}

export async function bootstrap() {}
export async function mount(props) {
  let cacheNode = window.globalMethods.getCache(microName)
  render(props, cacheNode)
}
export async function unmount() {
  window.globalMethods.dealCache(instance, microName).then(() => {
    instance = null
  })
}
