<template>
  <el-container v-if="isQiankun">
    <el-main v-loading="loading" element-loading-text="页面加载中...">
     <keep-alive :include="keepAliveList">
        <router-view v-slot="{ Component }">
          <component  :is="Component" />
        </router-view>
      </keep-alive>
    </el-main>
  </el-container>
  <el-container v-else>
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
import tags from './tags'
import {mapGetters} from "vuex";
export default {
  components: {
    tags,
  },
  name: 'index',
  data() {
    return {
      menuDataList,
      loading: false,
    }
  },
  computed: {
    ...mapGetters(["keepAliveList"]),
    isQiankun() {
      return window.__POWERED_BY_QIANKUN__
    },
  },
  mounted() {},
  methods: {
  },
}
</script>
<style>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
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
