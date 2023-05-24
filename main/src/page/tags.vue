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
import { mapGetters } from "vuex";
import { isMicroApp } from "@/util/utils.js"
import { microAppConfig } from "@/config/register.js"
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
      findTag(value) {
        let tag, key, componentName;
        this.tagList.map((item, index) => {
          if (item.value === value) {
            tag = item;
            key = index;
            componentName = item.componentName;
          }
        });
        return {tag, key, componentName};
      },
      removeTab(value) {
        let {tag, key, componentName} = this.findTag(value)
        if(key == 0) return
        this.$store.commit("DEL_TAG", tag)
        this.$store.commit("DEL_KEEPALIVE", componentName)
        if (tag.value === this.tag.value) {
          let newTag = this.tagList[key === 0 ? key : key - 1] //如果关闭本标签让前推一个
          this.openTag(newTag)
        }
        this.removeMicro(tag)
      },
      removeMicro(tag) {
        if(!isMicroApp(tag.value)) return
        let microName = tag.value.split('/')[1]
        for(let i = 0; i < this.tagList.length; i++) {
          let tagValue = this.tagList[i].value
          if(tagValue.startsWith('/' + microName))return
        }
        let keyObj = microAppConfig.filter(item => item.activeRule == '#/' + microName)
        this.Cache.delCache(keyObj[0].name)
      },
      openTag(item){
        this.$router.push({
          path: item.name || item.value
        });
      }
    }
  }
</script>