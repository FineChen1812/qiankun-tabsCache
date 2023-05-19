<template>
  <el-container>
  <el-header>
    <el-button type="danger" @click="clearCache">清除所有缓存</el-button>
  </el-header>
  <el-container>
    <el-aside width="300px">
      <el-menu
          :uniqueOpened="true"
          active-text-color="#409EFF"
          background-color="#D3DCE6"
          class="el-menu-vertical-demo"
          text-color="#000"
          :default-active="$route.path + ''"
          router
        >
          <div v-for="(item, index) in menuDataList" :key="index">
            <el-menu-item :index="item.path" :title="item.title">
              <i v-if="item.icon" :class="['iconfont', item.icon]"></i>
              <template #title>
                <span>{{ item.title }}</span>
              </template>
            </el-menu-item>
          </div>
        </el-menu>
    </el-aside>
    <el-main v-loading="loading" element-loading-text="页面加载中...">
      <tags></tags>
      <div v-show="!isMicroApp">
        <keep-alive :include="keepAliveList">
          <router-view v-slot="{ Component }">
            <component  :is="Component" />
          </router-view>
        </keep-alive>
      </div>
       <div v-show="isMicroApp">
        <div
          :id="item.id"
          v-for="item in microAppConfig"
          :key="item.id"
          v-show="isMicroApp"
        ></div>
      </div>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
import { menuDataList } from './menuData.js'
import { isMicroApp } from "@/config/tools.js"
import {microAppConfig} from "@/config/register.js"
import tags from "./tags";
import { clearStore } from "@/util/store"
import {mapGetters} from "vuex";
export default {
  components: {
    tags,
  },
  name: "index",
  data() {
    return {
      menuDataList,
      microAppConfig,
      loading: false,
      isMicroApp: false
    };
  },
  computed: {
    ...mapGetters(["keepAliveList"]),
    tagLen() {
      return this.tagList.length || 0;
    }
  },
  watch: {
    '$route.path': function(val){
      this.isMicroApp = isMicroApp(val)
    }
  },
  mounted() {
  },
  methods: {
    // isMicroApp(){
    //   console.log(isMicroApp(this.$route.path))
    //   return isMicroApp(this.$route.path)
    // },
    clearCache(){
      clearStore()
    }
  },
};
</script>
<style>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
  }
  
  .el-main {
    color: #333;
    text-align: center;
    /* line-height: 160px; */
    height: calc(100vh - 60px);
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>