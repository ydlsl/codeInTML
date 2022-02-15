<template>
  <div>
    <div>
      使用 缩放4
    </div>
    <canvas id="canvas4" style="display: block;margin: 0 auto;border: 1px solid #ccc;">
        你的浏览器不支持canvas
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
    var canvas = document.getElementById('canvas4')
    if(!canvas.getContext){
      return
    }
    var context = canvas.getContext('2d')

    let img = new Image()
    let stemp = 30 // 步进
    let len = 20
     // 计算尺寸的函数
    let roll = function (e) {
        e = e || window.event;
        if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件
            if (e.wheelDelta > 0) { //当滑轮向上滚动时
                stemp-= len
                return e.wheelDelta / 120 + stemp
            }
            if (e.wheelDelta < 0) { //当滑轮向下滚动时
                stemp+= len
                return e.wheelDelta / 120 + stemp
            }
        } else if (e.detail) {  //Firefox滑轮事件
            if (e.detail> 0) { //当滑轮向上滚动时
                stemp-= len
                return e.wheelDelta / 120 + stemp
            }
            if (e.detail< 0) { //当滑轮向下滚动时
                stemp+= len
                return e.wheelDelta / 120 + stemp
            }
        }
    };
    //给页面绑定滑轮滚动事件
    if (document.addEventListener) {
        document.addEventListener('DOMMouseScroll', roll, false)
    }
    canvas.onmousewheel = canvas.onmousewheel = roll // 给canvas绑定滑轮滚动事件

    //滚动滑轮触发scrollFunc方法
    window.onload = function () {
        canvas.width = 340
        canvas.height = 200
        img.src = 'https://mdn.mozillademos.org/files/1429/Canvas_earth.png'
        img.onload = function () {

            drawImageScale()
            canvas.onmousewheel = canvas.onmousewheel = function () {
                let resize = roll()
                drawImageScale(resize)
            }
        }
    }
    // 控制写入图片大小的函数
    function drawImageScale (resize) {
        if (!resize) {
            resize = 10
        }
        let imgWidth = 1524 + resize
        let imgHeight = 976 + resize
        // let sx = imgWidth / 2 - canvas.width / 2
        // let sy = imgHeight / 2 - canvas.height / 2
        let dx =  canvas.width / 2 - imgWidth / 2
        let dy = canvas.height / 2 - imgHeight / 2
        context.drawImage(img, dx, dy, imgWidth, imgHeight, 0, 0, canvas.width, canvas.height)
    }

  }
}
</script>
<style scoped>
/* @import url(); 引入css类 */

</style>