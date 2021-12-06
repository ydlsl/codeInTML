<template>
  <div>
    <div>
      修改canvas的形状
    </div>
    <canvas id='canvas'>
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
    var canvas = document.getElementById("canvas");
  // 设置宽度和高度,但是这种写法会造成额外的问题
  //  画布会拉伸,结合绘制图像才能看出拉伸
    // canvas.style.width = "500px"
    // canvas.style.height = '500px'
 // 所以推荐写法
 // 1.使用内联样式表
 // 2.去使用点(.)
    canvas.width = "500"; //注意，不要加 px
    canvas.height = "500";

  // 获取2D环境
    var ctx = canvas.getContext('2d')
  // line
    ctx.beginPath()
    ctx.moveTo(10, 10) //start
    ctx.lineTo(100, 100) //end
    ctx.closePath()
    ctx.fill() //填充当前line,可以不用
    ctx.lineWidth = 10 // 线宽，以线条为中心外扩
    ctx.strokeStyle = "red" //设置绘制的样式，这个属性设置要放在stroke之前
    ctx.stroke() //填充 canvas 当前路径绘制边框
    
  //多角形
    ctx.beginPath()
    ctx.moveTo(120, 10) //start
    ctx.lineTo(120, 40)
    ctx.lineTo(150, 40) //end
    ctx.lineTo(150, 20) //end
    ctx.closePath() //结束绘制，自动连接起点
    ctx.fillStyle = '#999' //填充颜色
    ctx.lineWidth = 5 // 线宽，以线条为中心外扩
    ctx.fill() //填充
    ctx.lineJoin = 'bevel' //bevel--创建斜角 round--创建圆角  miter--默认，创建尖角
    ctx.stroke() //填充 canvas 当前路径绘制边框， 多边形的时候可以不用

  //矩形快捷方式
    ctx.fillStyle = '#999';// 设置填充颜色
    ctx.fillRect(170,20,40,30);// 填充一个矩形 x,y,w,h, 

  //矩形边框
    ctx.strokeStyle = '#00f';// 设置填充颜色
    ctx.lineWidth = 5;// 设置线条宽度 
    ctx.strokeRect(230,30,120,60);// 填充一个矩形边框，这步要在最后设置
    
  //字符串
    ctx.fillStyle = '#00f' //字体颜色
    ctx.font = 'italic 50px 隶书'
    // ctx.textBaseline = 'top' //
    ctx.fillText('达先生真是帅',250,150,200) // x,y,宽度 左下角为起点

  //设置阴影，以下的都有效
    ctx.shadowBlur = 5.6;// 设置阴影的模糊程度
    ctx.shadowColor = '#222';// 设置阴影的颜色
  // 设置阴影在 X,Y 方向的偏移
    ctx.shadowOffsetX = 6;
    ctx.shadowOffsetY = -6;
  //填充字符串
    ctx.strokeStyle = 'f0f' //字体外框颜色
    ctx.font = 'bold 45px 宋体'
    ctx.lineWidth = 2;// 设置线条宽度 
    ctx.strokeText('达先生我爱你',10,180,200) // 绘制字符串的边框
    
  //清除区域, 区域透明
    ctx.beginPath()
    ctx.clearRect(170,100,100,100)
    ctx.lineWidth = 2
    ctx.strokeRect(170,100,101,101)
    ctx.closePath()
    
  }
}
</script>
<style scoped>
/* @import url(); 引入css类 */

</style>