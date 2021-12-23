<template>
  <div>
    <div class="left-menu">
      <el-dropdown size="medium">
        <el-button type="text">
          我的工作台<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>

        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="OpenHome('fabric')">fabric</el-dropdown-item>
            <el-dropdown-item @click="OpenHome('move')">move</el-dropdown-item>
            
            <el-dropdown-item @click="OpenHome('qrcode')">qrcode</el-dropdown-item>
            <el-dropdown-item @click="OpenHome('draw')">draw</el-dropdown-item>
            <el-dropdown-item @click="OpenHome('changeBox')">changeBox</el-dropdown-item>
            <el-dropdown-item @click="OpenHome('scale')">scale</el-dropdown-item>
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