<template>
  <div class="container">
    <div class="aside">
      <Aside></Aside>
    </div>
    <div class="main">
      <Main></Main>
    </div>
  </div>
</template>
<script setup>
import Aside from './aside.vue';
import Main from './main.vue';
</script>
<style lang="scss" scoped>
.container {
  height: 100vh;
  display: flex;
  .aside {
    width: 300px;
    background-color: F4F8FA;
  }
  .main {
    flex-grow: 1;
    background-color: #f1f3f8;
  }
}
</style>
