<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const selectedKeys = ref(['1'])

// 根据当前路由更新选中的菜单项
if (route.path === '/monitoring') {
  selectedKeys.value = ['2']
}

</script>

<template>
  <a-layout>
    <a-layout-header class="header">
      <div class="header-content">
        <a href="/" class="logo-container">
          <img src="./assets/logo.svg" class="logo" alt="logo">
          <span class="title">邑州监狱</span>
        </a>
        <a-menu
          v-model:selectedKeys="selectedKeys"
          theme="dark"
          mode="horizontal"
          class="menu"
        >
          <a-menu-item key="1">
            <router-link to="/">人员关系网</router-link>
          </a-menu-item>
          <a-menu-item key="2">
            <router-link to="/monitoring">人员监测</router-link>
          </a-menu-item>
          <a-menu-item key="3">
            <router-link to="/dialog">语音对话</router-link>
          </a-menu-item>
        </a-menu>
      </div>
    </a-layout-header>
    <a-layout-content style="padding: 20px 50px" >
      <div :style="{ background: '#fff', padding: '24px', minHeight: 'calc(100vh - 64px - 70px)' }">
        <RouterView/>
      </div>
    </a-layout-content>
  </a-layout>
  <a-layout-footer style="text-align: center">
      邑州监狱情感识别项目 ©2018 Created by 电子科技大学xxx实验室
    </a-layout-footer>
</template>

<style scoped>
.site-layout-content {
  min-height: 280px;
  padding: 24px;
  background: #fff;
}

.header {
  padding: 0;
}

.header-content {
  padding: 0 50px;
}

.logo-container {
  float: left;
  display: flex;
  align-items: center;
  text-decoration: none;
  margin-right: 40px;
}

.logo {
  height: 50px;
  margin-right: 16px;
}

.title {
  color: white;
  font-size: 18px;
  margin: 0;
}

.menu {
  line-height: 64px;
}

.ant-row-rtl #components-layout-demo-top .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

[data-theme='dark'] .site-layout-content {
  background: #141414;
}

</style>
