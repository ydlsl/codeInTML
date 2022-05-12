<!--
 * @Author: yangda 1341521959@qq.com
 * @Date: 2022-05-07 10:25:47
 * @LastEditors: yangda 1341521959@qq.com
 * @LastEditTime: 2022-05-07 15:02:40
 * @FilePath: /canvas2d/src/pages/header.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <div class="left-menu">
      <el-dropdown size="medium">
        <el-button type="text">
          我的工作台<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>

        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="OpenHome('wasm')">wasm</el-dropdown-item>
            <el-dropdown-item @click="OpenHome('move')">move</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  created() {
    
  },
  mounted() {
    
  },
  methods: {
    OpenHome(page){
      this.$router.push(page)
    }
  },
}
</script>
<style lang='scss' scoped>
/* @import url(); 引入css类 */

</style>