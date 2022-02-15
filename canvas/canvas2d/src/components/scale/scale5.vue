<template>
  <div>
    <div>
      使用 缩放5
    </div>
    <canvas id="canvas5" width="300" height="300" style="display: block;margin: 0 auto;border: 1px solid #ccc;">
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

    var divObj=document.getElementById("canvas5");
    var moveFlag=false;

    divObj.onmousedown=function(e){
      moveFlag=true;
      var clickEvent=window.event||e;
      var mwidth=clickEvent.clientX-divObj.offsetLeft;
      var mheight=clickEvent.clientY-divObj.offsetTop;
      document.onmousemove=function(e){
          var moveEvent=window.event||e;
          if(moveFlag){
              divObj.style.left=moveEvent.clientX-mwidth+"px";
              divObj.style.top=moveEvent.clientY-mheight+"px";
              divObj.onmouseup=function(){
                  moveFlag=false;
              }
          }
      }
    }
    document.onmouseup = function(){  
        document.onmousedown = null;  
        document.onmousemove = null;  
    };  
  }
}
</script>
<style scoped>
/* @import url(); 引入css类 */

</style>