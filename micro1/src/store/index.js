import Vue from 'vue'
import Vuex from 'vuex'
import {setStore, getStore} from '@/util/store.js'
import { diff } from "@/util/utils"

Vue.use(Vuex)
const tagObj = {
  label: '', //标题名称
  value: '', //标题的路径
  params: '', //标题的路径参数
  query: '', //标题的参数
  meta: {},//额外参数
}
export default new Vuex.Store({
  state: {
    tagList: getStore({name: 'tagList'}) || [],
    tag: getStore({name: 'tag'}) || tagObj,
  },
  mutations: {
    ADD_TAG: (state, action) => {
      state.tag = action;
      setStore({name: 'tag', content: state.tag})
      if (state.tagList.some(ele => diff(ele, action))) return
      state.tagList.push(action)
      setStore({name: 'tagList', content: state.tagList})
    },
    DEL_TAG: (state, action) => {
      state.tagList = state.tagList.filter(item => {
        return !diff(item, action);
      })
      setStore({name: 'tagList', content: state.tagList})
    },
  },
  actions: {
  },
  getters: {
    tagList: (state) => state.tagList,
    tag: (state) => state.tag
  }
})
