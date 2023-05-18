<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import {clearStore} from "@/util/store"
export default {
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
