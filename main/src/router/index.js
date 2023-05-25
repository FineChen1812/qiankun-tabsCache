import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../page/index.vue'
import store from '../store'

Vue.use(VueRouter)

export const routes = [
  {
    path: '/micro1',
    name: 'micro1',
    component: Layout,
    redirect: '/micro1/index',
    children: [
      {
        path: 'home',
        name: 'Home',
        meta: {
          noClose: true,
          keepalive: false,
          title: '首页'
        },
        // component: () => import("@/views/home.vue")
      },
      {
        path: 'form',
        name: 'Form',
        meta:{
          keepalive: true,
          title: '子-表单'
        },
        // component: () => import("@/views/form.vue")
      },
      {
        path: 'list',
        name: 'List',
        meta:{
          keepalive: false,
          title: '子-列表'
        },
        // component: () => import("@/views/list.vue")
      },
    ]
  }, 
  {
    path: '/main',
    name: 'Home',
    component: Layout,
    redirect: '/main/home',
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
          title: '主-表单'
        },
        component: () => import("@/views/form.vue")
      },
      {
        path: 'list',
        name: 'List',
        meta:{
          keepalive: false,
          title: '主-列表'
        },
        component: () => import("@/views/list.vue")
      },
    ]
  }, 
  {
    path: '/', 
    redirect: '/main',
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const meta = to.meta
  const value = to.query.src || to.fullPath
  const label = meta.title || to.name
  store.commit("ADD_TAG", {
    label: label,
    value: value,
    params: to.params,
    query: to.query,
    componentName: to.name,
    meta: meta,
  });
  if(meta.keepalive ) store.commit("SET_KEEP_ALIVE", to.name)
  next()
})


export default router
