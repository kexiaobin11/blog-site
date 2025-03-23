<script setup lang="ts">
import Sidebar from './components/Sidebar/index.vue'
import Header from './components/Header/index.vue'
</script>

<template>
  <div class="layout">
    <div class="sidebar-container">
      <Sidebar/>
    </div>
    <div class="header-container mt-2">
      <Header/>
      <div class="mt-4 mr-2">
        <RouterView/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  justify-content: flex-start; /* 或者center, space-between, 根据需要调整 */
}

.header-container {
  flex-grow: 1; /* 让header容器占满剩余空间 */
}
</style>
