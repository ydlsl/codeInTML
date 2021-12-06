<template>
  <div>
    <div>
      使用fabric
    </div>
    <canvas id='canvas' >
    </canvas>
  </div>
</template>

<script>
import { fabric } from 'fabric'
export default {
  data() {
    return {
      
    }
  },
  created() {
    
  },
  mounted() {
    var canvas = new fabric.Canvas('canvas')
    var rect = new fabric.Rect({
      left: 10,
      top: 10,
      fill: 'red',
      width: 50,
      height: 50
    })

    canvas.add(rect)
  }
}
</script>
<style scoped>
/* @import url(); 引入css类 */

</style>