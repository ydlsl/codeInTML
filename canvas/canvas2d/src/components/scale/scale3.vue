<template>
  <div>
    <div>
      使用 缩放3
    </div>
    <canvas id="canvas3" style="display: block;margin: 0 auto;border: 1px solid #ccc;">
        你的浏览器不支持canvas
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
  mounted(){
    let canvas = document.getElementById('canvas3')
    var ctx = canvas.getContext('2d');
 
        var img = new Image();
        img.src = 'https://mdn.mozillademos.org/files/1429/Canvas_earth.png';
 
        // 图片加载完成
        img.onload = function () {
            // 要绘制的飞机的位置
            var x = 0; 
            // 要绘制的飞机的位置
            var y = 0;  
            // 监听鼠标在画布上方移动事件
            canvas.onmousemove = function (e) {
                // e.offsetX为事件相对事件源的坐标
                x = e.offsetX - img.width / 2;
                // e.offsetY为事件相对事件源的坐标
                y = e.offsetY - img.height / 2;
                
            };
            // 使用定时器，不停的清画布，重绘图片以实现类似拖拽的效果
            setInterval(function () {
                ctx.clearRect(0, 0, 500, 400);
                ctx.drawImage(img, x, y);
            }, 20);
        }
  }
}
</script>
<style scoped>
/* @import url(); 引入css类 */

</style>