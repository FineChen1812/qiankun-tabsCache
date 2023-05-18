import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../page/index.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/main',
    name: 'Home',
    component: Layout,
    redirect: '/main/index',
    children: [
      {
        path: 'index',
        name: '首页',
        meta: {
          isTab: true,
          noClose: true
        },
        component: () => import("@/views/home.vue")
      },
      {
        path: 'form',
        name: '表单',
        meta:{
          isTab: true
        },
        component: () => import("@/views/form.vue")
      }
    ]
  }, 
  {
    path: '*', 
    redirect: '/main/index',
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const meta = to.meta
  const value = to.query.src || to.fullPath
  const label = to.query.name || to.name
  if(meta.isTab) {
    store.commit("ADD_TAG", {
      label: label,
      value: value,
      params: to.params,
      query: to.query,
      meta: meta,
    });
  }
  next()
})

export default router
