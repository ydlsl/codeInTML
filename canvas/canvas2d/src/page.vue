<template>
  <el-container class="hei100">
    <el-header height="48px">
      <!-- 输出head组件 -->
      <HeadNav />
    </el-header>
    <!-- page detail -->
    <el-main class="main-bg">
      <!-- 使用router-view输出子路由页面 -->
      <router-view></router-view>
    </el-main>
  </el-container>
</template>
<script>
import HeadNav from './pages/header'
export default {
  components:{
    HeadNav
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#canvas{
  background: #aabfd4
}
html {
  width: 100%;
  height: 100%;
}
</style>
