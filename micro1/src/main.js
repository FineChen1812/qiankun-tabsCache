import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

Vue.use(ElementUI);
let instance = null
function render(props) {
  instance = new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount('#micro1') 
}
if (window.__POWERED_BY_QIANKUN__) {
  // 动态添加publicPath
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
}
if (!window.__POWERED_BY_QIANKUN__) {
  // 默认独立运行
  render()
}
export async function bootstrap() {}
export async function mount(props) {
  console.log('zi')
  render(props)
}
export async function unmount() {
  instance.$destroy()
}
