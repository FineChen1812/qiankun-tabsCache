<template>
  <div class="tabBar" >
    <el-tabs v-model="active" :closable="tagLen!==1" type="card" @tab-remove="removeTab" @tab-click="openTag">
    <el-tab-pane
      :key="item.value"
      v-for="(item) in tagList"
      :label="item.label"
      :name="item.value"
    >
  </el-tab-pane>
</el-tabs>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
  export default {
    data() {
      return {
        active: '',
        isFirstPage: false
      }
    },
    computed: {
      ...mapGetters(["tagList", "tag"]),
      tagLen() {
        return this.tagList.length || 0;
      }
    },
    watch:{
      tag() {
        this.setActive();
      }
    },
    mounted() {
      this.setActive();
    },
    methods: {
      setActive() {
        this.active = this.tag.value
        this.isFirstPage = this.tag.mate?.noClose
      },
      removeTab(targetName) {
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      },
      openTag(item){
        console.log(item)
        this.$router.push({
          path: item.name
        });
      }
    }
  }
</script>