<template>
  <div>
    <div>
      使用fabric
    </div>
    <canvas id='canvas' >
    </canvas>
    <canvas id="c"></canvas>
    <img src="../assets/logo.png" id="my-image" class="image" @click="change">
  </div>
</template>

<script>
import { fabric } from 'fabric'
export default {
  data() {
    return {
      
    }
  },
  methods: {
    change(){
      debugger
      //  在fabric中无效
    }
  },
  mounted() {
    var canvas1 = new fabric.Canvas('canvas')
    var rect = new fabric.Rect({
      left: 10,
      top: 10,
      fill: 'red',
      width: 50,
      height: 50
    })
    canvas1.add(rect)

    var canvas = new fabric.Canvas('c');
    var imgElement = document.getElementById('my-image');
    var imgInstance = new fabric.Image(imgElement, {
      left: 10,
      top: 10,
      angle: 30,
      opacity: 0.85,
      // borderColor: 'transparent',
      // cornerColor: 'transparent'
      // hasBorders: false, //不显示选中时的边
      hasControls:false, //不显示控制的那9个按钮
    });
    
    canvas.add(imgInstance);
   
    // 居中
    imgInstance.viewportCenter()
    imgInstance.viewportCenterH()
    imgInstance.viewportCenterV()
    







    let things = canvas.getObjects()
    console.log('canvas things = ',things)
    console.log('canvas = ',canvas)
    

  }
}
</script>
<style scoped>
/* @import url(); 引入css类 */
.image{
  display: none;
}
</style>