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
      findTag(value) {
        let tag, key;
        this.tagList.map((item, index) => {
          if (item.value === value) {
            tag = item;
            key = index;
          }
        });
        return {tag: tag, key: key};
      },
      removeTab(value) {
          let {tag, key} = this.findTag(value);
          if(key == 0) return
          this.$store.commit("DEL_TAG", tag)
          if (tag.value === this.tag.value) {
            tag = this.tagList[key === 0 ? key : key - 1] //如果关闭本标签让前推一个
            this.openTag(tag)
          }
      },
      openTag(item){
        this.$router.push({
          path: item.value
        });
      }
    }
  }
</script>