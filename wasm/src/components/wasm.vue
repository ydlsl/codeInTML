<template>
  <div>
    <el-button
      @click="loadwasm"
    >load wasm</el-button>
    <el-button
      @click="testwasm"
    >test wasm</el-button>
  </div>
</template>

<script>
import { loadTest, getTest } from '../utils/index'
export default  {
  methods: {
    loadwasm(){
      loadTest().then(res=>{
        console.log('成功')
      })
    },
    testwasm(){
      let asd = getTest('1234561231245', 5)
      console.log('res = ', asd)
    }
  }
}
</script>

<style lang='scss' scoped>

</style>