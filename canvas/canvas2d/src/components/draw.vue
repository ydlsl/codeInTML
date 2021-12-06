<template>
  <div>
    <div>
      繪制復雜的圖形
    </div>
    <canvas id='canvas' >
    </canvas>
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
    var canvas = document.getElementById('canvas')
    if(!canvas.getContext){
      return
    }
    var ctx = canvas.getContext('2d')

    ctx.beginPath();
    ctx.arc(75, 75, 50, 0, Math.PI * 2, true) // 绘制
    ctx.moveTo(110, 75)
    ctx.arc(75, 75, 35, 0, Math.PI, false)   // 口(顺时针)
    ctx.moveTo(65, 65)
    ctx.arc(60, 65, 5, 0, Math.PI * 2, true)  // 左眼
    ctx.moveTo(95, 65)
    ctx.arc(90, 65, 5, 0, Math.PI * 2, true) // 右眼
    
    ctx.moveTo(175, 65) //起點爲小圓的下點
    ctx.arc(175, 75, 35, 0, Math.PI, false) //畫半圓，線不斷
    ctx.lineTo(175, 65) //畫線，到小圓小點
    ctx.moveTo(180, 60) //移動到圓心
    ctx.arc(175, 60, 5, 0, Math.PI * 2, true)


  //圓弧
    ctx.moveTo(0, 0)
    ctx.arcTo(50, 0, 0, 100, 10)

    ctx.stroke()

  }
}
</script>
<style scoped>
/* @import url(); 引入css类 */

</style>