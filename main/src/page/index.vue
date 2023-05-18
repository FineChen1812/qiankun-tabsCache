<template>
  <el-container>
  <el-header>Header</el-header>
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
      <div v-show="$route.name">
          <router-view v-slot="{ Component }">
            <keep-alive :include="keepAliveList['iframe'] || []">
              <component :is="Component" />
            </keep-alive>
          </router-view>
        </div>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
import { menuDataList } from './menuData.js'
import tags from "./tags";
export default {
  components: {
    tags,
  },
  name: "index",
  data() {
    return {
      menuDataList,
      loading: false
    };
  },
  mounted() {
  },
  methods: {
    
    //打开菜单
    openMenu(item = {}) {
      
    },
    getPath(data) {
    },
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