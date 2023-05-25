import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../page/index.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/micro1',
    name: 'Home',
    component: Layout,
    redirect: '/micro1/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        meta: {
          noClose: true,
          keepalive: false,
          title: '首页'
        },
        component: () => import("@/views/home.vue")
      },
      {
        path: 'form',
        name: 'Form',
        meta:{
          keepalive: true,
          title: '子-表单'
        },
        component: () => import("@/views/form.vue")
      },
      {
        path: 'list',
        name: 'List',
        meta:{
          keepalive: false,
          title: '子-列表'
        },
        component: () => import("@/views/list.vue")
      },
    ]
  }, 
  {
    path: '/', 
    redirect: '/micro1/home',
  }
]

export function initRouter(){
  const router = new VueRouter({
    routes
  })
  
  router.beforeEach((to, from, next) => {
    const meta = to.meta
    const value = to.query.src || to.fullPath
    const label = to.query.name || to.name
    store.commit("ADD_TAG", {
      label: label,
      value: value,
      params: to.params,
      query: to.query,
      meta: meta,
    });
    if(meta.keepalive ) store.commit("SET_KEEP_ALIVE", to.name)
    next()
  })

  return router
}
