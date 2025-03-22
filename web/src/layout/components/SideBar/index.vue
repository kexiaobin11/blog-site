<template>
  <div class="worktitle-sidebar" :class="{ 'is-collapse': isCollapse }">
    <div class="logo-container mt-2">
      <span v-show="!isCollapse" class="mr-3">博客管理平台</span>
    </div>

    <el-menu
      :default-active="activePath"
      :collapse="isCollapse"
      background-color="#2c3e50"
      text-color="#ffffff"
      active-text-color="#3498db"
    >
      <!-- 一级菜单 -->
      <el-menu-item index="1">
        <el-icon>
          <User/>
        </el-icon>
        <span>用户中心</span>
      </el-menu-item>

      <el-menu-item index="2">
        <el-icon>
          <el-icon-edit/>
        </el-icon>
        <span>标签管理</span>
      </el-menu-item>

      <el-menu-item index="3">
        <el-icon>
          <el-icon-edit/>
        </el-icon>
        <span>文章管理</span>
      </el-menu-item>

      <el-menu-item index="4">
        <el-icon>
          <Setting/>
        </el-icon>
        <span>系统配置</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import {Fold, User, Setting} from '@element-plus/icons-vue'

const isCollapse = ref(false)
const activePath = ref('1')

const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
  localStorage.setItem('sidebarCollapse', isCollapse.value)
}
</script>

<style>
.worktitle-sidebar {
  width: 220px;
  min-height: 100vh;
  background: #2c3e50;
  padding-left: 20px;
  transition: width 0.3s;
}

.is-collapse {
  width: 64px;
}

.logo-container {
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  color: white;
  border-bottom: 1px solid #34495e;
}

.el-menu {
  border-right: none;
}

/* 白色字体优化 */
.el-menu-item,
.el-sub-menu__title {
  color: #ffffff !important; /* 强制覆盖默认颜色 */
}

.el-menu-item.is-active {
  color: #3498db !important; /* 保持激活状态蓝色 */
}

/* 折叠状态文字隐藏 */
.is-collapse .el-menu-item span {
  display: none;
}
</style>
