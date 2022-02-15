<template>
  <div>
    <div>
      使用 缩放2
    </div>
    <div class="canvas-bg">
      <canvas id="canvas2" width="300" height="300" class="bg">
        你的浏览器不支持canvas
      </canvas>
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

    let ctx = document.getElementById('canvas2').getContext('2d');
    let obj = {
        fontX: 0,
        fontY: 0,
        fontZoom: 1,
        curZoom: 1,
        translateX: 0,
        translateY: 0,
        draw() {
            ctx.fillRect(150, 150, 50, 50)
        },
        zoom(offsetX, offsetY, z) {
            ctx.save()
            ctx.clearRect(0, 0, 300, 300);
            this.curZoom = this.fontZoom + z
            this.translateX = offsetX - (offsetX - this.translateX) * this.curZoom / this.fontZoom
            this.translateY = offsetY - (offsetY - this.translateY) * this.curZoom / this.fontZoom
            ctx.translate(this.translateX, this.translateY)
            ctx.scale(this.curZoom, this.curZoom);
            this.draw()
            ctx.restore()
            this.fontY = offsetY
            this.fontX = offsetX
            this.fontZoom = this.curZoom
        }
    }
    obj.draw()
    document.getElementById('canvas2').addEventListener('mousewheel', (e) => {
        let z = e.deltaY > 0 ? -0.1 : 0.1
        obj.zoom(e.offsetX, e.offsetY, z)
    })

    document.getElementById('canvas2').addEventListener('mousewheel', (e) => {
        let z = e.deltaY > 0 ? -0.1 : 0.1
        obj.zoom(e.offsetX, e.offsetY, z)
    })


  }
}
</script>
<style scoped>
/* @import url(); 引入css类 */
.canvas-bg{
  border: 2px solid #e2e2fa;
}
</style>