<template>
  <div class="video_player">
    <video-player 
      v-bind="options" 
      @play="onPlay"
      @pause="onPause" 
      @timeupdate="onTimeupdate" 
      @canplay="onCanplay"
    ></video-player>
  </div>
</template>
<!-- 
  npm i vue3-video-play --save 
  有视频缓存效果
 -->
<script>
import 'vue3-video-play/dist/style.css'
import {videoPlay} from 'vue3-video-play'
  // export
  export default {
    components: {
      videoPlayer: videoPlay
    },
    data() {
      return {
        options: {
          width: '800px', //播放器高度
          height: '450px', //播放器高度
          color: "#409eff", //主题色
          muted: false, //静音
          webFullScreen: false,
          speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0"], //播放倍速
          autoPlay: false, //自动播放
          loop: false, //循环播放
          mirror: false, //镜像画面
          ligthOff: false,  //关灯模式
          volume: 0.3, //默认音量大小
          control: true, //是否显示控制器
          title: '', //视频名称
          // type: 'video',
          // src: 'https://www.summercarp.com/resource/test.flv',
          src: 'http://vjs.zencdn.net/v/oceans.mp4', //视频源
          poster: '', //封面
          //https://blog.csdn.net/xdlumia/article/details/119865000
        }
      }
    },
    methods: {
      onPlay(ev){
        console.log('播放')
      },
      onPause(ev){
        console.log(ev, '暂停')
      },
      onTimeupdate(ev){
        // console.log(ev, '时间更新')
      },
      onCanplay(ev){
        console.log(ev, '可以播放')
      }
    }
  }
</script>
<style lang="scss" scoped>
.video_player{
  display: flex;
  justify-content: center;
}
</style>