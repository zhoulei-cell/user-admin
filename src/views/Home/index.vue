<template>
  <div class="home">
    <el-container class="home-container">
      <!-- 头部区域 -->
      <el-header class="home-header">
        <div class="logo">用户管理系统</div>
        <div class="user">
          <span>用户名：</span>
          <span>Admin</span>
        </div>
      </el-header>
      <!-- 头部区域 -->
      <el-container class="home-content">
        <!-- 侧边栏区域 -->
        <el-aside class="home-aside" width="200px">
          <el-menu :router="true" @select="handleSelect" :default-active="defaultActive" :unique-opened="true">
            <el-menu-item index="/home">
              <i class="el-icon-house"></i>
              <span slot="title">后台首页</span>
            </el-menu-item>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-user"></i>
                <span>用户管理</span>
              </template>
              <el-menu-item index="/user/list">用户列表</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-lock"></i>
                <span>权限管理</span>
              </template>
              <el-menu-item index="/auth">管理列表</el-menu-item>
            </el-submenu>
            <el-menu-item index="/logout">
              <i class="el-icon-switch-button"></i>
              <span slot="title">退出登录</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <!-- 侧边栏区域 -->
        <el-container>
          <!-- 右侧主体区域 -->
          <el-main class="home-main">
            <router-view></router-view>
          </el-main>
          <!-- 右侧主体区域 -->
          <!-- 底部区域 -->
          <el-footer class="home-footer">footer</el-footer>
          <!-- 底部区域 -->
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      defaultActive: '/home'
    }
  },
  created() {
    this.getNavActive()
  },
  methods: {
    handleSelect(path) {
      this.defaultActive = path
      window.sessionStorage.setItem('admin_nav_active', path)
    },
    getNavActive() {
      const path = window.sessionStorage.getItem('admin_nav_active')
      if (path) {
        this.defaultActive = path
      }
    }
  }
}
</script>

<style>
  .home{
    overflow: hidden;
    height: 100%;
  }
  .home .home-container{
    height: 100%;
  }
  .home .home-container .home-header{
    background-color: #99A9BF;
  }
  .home .home-container .home-header .logo{
    float: left;
    color: #fff;
    font-size: 26px;
    font-weight: bold;
    line-height: 60px;
  }
  .home .home-container .home-header .user{
    color: #fff;
    float: right;
    font-size: 14px;
    line-height: 60px;
    cursor: pointer;
  }

  .home .home-container .home-content .home-aside{
    background-color: #FFF;
    /*background-color: #D3DCE6;*/
  }

  .home .home-container .home-content .home-main{
    background-color: #E9EEF3;
  }

  .home .home-container .home-content .home-footer{
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
</style>
