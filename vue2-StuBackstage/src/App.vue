<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
//初始化样式表
import "./assets/css/resest.css";
export default {
  name: "App"
};
</script>

<style>
#app {
  height: 100vh;
  width: 100vw;
}
</style>
