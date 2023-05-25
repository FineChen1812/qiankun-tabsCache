<template>
  <div id="micro1">
    <router-view/>
  </div>
</template>
<script>
import {clearStore} from "@/util/store"
export default {
  name: 'APP',
  unmounted() {
    clearStore()
  }
}
</script>
<style>
html, body {
  margin: 0;
  padding: 0;
}
</style>
