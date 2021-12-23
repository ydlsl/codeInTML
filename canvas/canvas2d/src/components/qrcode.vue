<template>
  <div>
    <div id="qrCode" ref="qrCodeDiv">
      <img id='imgtest' src="" />
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'
export default {
  data() {
    return {
      imageData : ''
    }
  },
  created() {
    
  },
  mounted() {
    var div = document.createElement("div");
    let qrcode = new QRCode(div, {
      text: 'https://www.baidu.com',
      width: 200,
      height: 200,
      colorDark: "#333333", //二维码颜色
      colorLight: "#ffffff", //二维码背景色
      correctLevel: QRCode.CorrectLevel.L//容错率，L/M/H
    })

    var canvas= div.getElementsByTagName('canvas')[0];
    let data = canvas.toDataURL('image/jpg')

    
    var img = document.getElementById('imgtest')
    img.src = data

    
  },
  methods:{
    
  }
}
</script>
<style scoped>
/* @import url(); 引入css类 */

</style>