<template>
    <div class="card">
      <div class="card-header">
        <div class="header-content">
          <!-- 左侧部分：工作台 -->
          <div class="title">
            <h1 class="worktitle">工作台</h1>
          </div>
          <!-- 右侧部分：用户信息和退出登录 -->
          <div class="user-info">
            <span class="username">用户名: 张三</span>
            <el-button @click="logout" type="text" size="small">退出登录</el-button>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ElButton } from 'element-plus';

const logout = () => {
  // 这里可以实现退出登录的逻辑，比如清除用户信息、跳转到登录页等
  console.log('用户已退出登录');
};
</script>

<style scoped>
.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  display: flex;
  align-items: center;
}

.worktitle {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.user-info {
  display: flex;
  align-items: center;
}

.username {
  font-size: 16px;
  color: #555;
  margin-right: 15px;
}

.el-button {
  font-size: 14px;
  color: #409eff;
}
</style>
