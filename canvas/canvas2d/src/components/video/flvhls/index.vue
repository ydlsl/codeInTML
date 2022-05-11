<template>
  <div class="video_player">
    <video
      id="mmiid"
      class="video-js vjs-big-play-centered vjs-fluid"
      controls
      preload="auto"
      width="100%"
      height="100%"
    >
    </video>
  </div>
</template>
<!-- 
  npm install video.js --save
  //flv格式
  npm install flv.js --save
  npm install videojs-flvjs-es6 --save
 -->
<script>
import Videojs from 'video.js'
import 'video.js/dist/video-js.css'
import "videojs-flvjs-es6"

export default  {
  data() {
    return {
      
    }
  },
  mounted(){
    this.startFlv()
    // this.startHls()
  },
  methods: {
    startHls(){
      // hls 不太行
      this.videoPlayer = Videojs(document.querySelector('#mmiid'),{
          autoplay: 'muted',//自动播放
          controls: true,//用户可以与之交互的控件
          loop:true,//视频一结束就重新开始
          muted:false,//默认情况下将使所有音频静音
          aspectRatio:"16:9",//显示比率
          fullscreen:{
              options: {navigationUI: 'hide'}
          },
          techOrder: ["html5", "flvjs"],// 兼容顺序
          html5:{hls: {
              cors: true,
              isLive: false,
              withCredentials: false,
          }},
          sources: [{ 
            src: 'http://devimages.apple.com/iphone/samples/bipbop/bipbopall.m3u8', 
            type: "application/x-mpegURL" ,
          }]
      })
    },
    
    startFlv(){
      //flv
      this.videoPlayer = Videojs(document.querySelector('#mmiid'),{
        autoplay: 'muted',//自动播放
        controls: true,//用户可以与之交互的控件
        loop:true,//视频一结束就重新开始
        muted:false,//默认情况下将使所有音频静音
        aspectRatio:"16:9",//显示比率
        fullscreen:{
            options: {navigationUI: 'hide'}
        },
        techOrder: ["html5", "flvjs"],// 兼容顺序
        flvjs: {
            mediaDataSource: {
                isLive: false,
                cors: true,
                withCredentials: false
            }
        },
        sources: [{ 
          src: 'http://1011.hlsplay.aodianyun.com/demo/game.flv', 
          type: "video/x-flv" 
        }]
      })

    }
  },
}
</script>

<style lang="scss" scoped>
.video_player{
  display: flex;
  justify-content: center;
}
</style>