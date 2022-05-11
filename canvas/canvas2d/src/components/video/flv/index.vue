<template>
  <div>
    <video
      autoplay
      controls
      width="800"
      height="500"
      id="videoElement"
    ></video>
  </div>
</template>
<!-- 
  这是哔哩哔哩的开源组件
  npm install --save flv.js
 -->
<script>
import flvjs from "flv.js"

export default {
  props: {
    url: {
      type: String,
      default: 'http://1011.hlsplay.aodianyun.com/demo/game.flv',//'http://1011.hlsplay.aodianyun.com/demo/game.flv'
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.createVideo()
    })
  },
  methods: {
    createVideo() {
      if (flvjs.isSupported()) {
        var videoElement = document.getElementById("videoElement")
        var flvPlayer = flvjs.createPlayer({
          type: "flv",
          url: this.url, //你的url地址
          cors: true
        })
        flvPlayer.attachMediaElement(videoElement)
        flvPlayer.load()
        setTimeout(() => {
          flvPlayer.play()
        }, 1000)
      }
    },
  },
}
</script>
