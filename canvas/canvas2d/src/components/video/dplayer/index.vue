<template>
  <div class="video_player">
    <div id="dplayer"></div>
  </div>
</template>
<!-- 
  npm install dplayer -S
 -->
<script>
  import DPlayer from 'dplayer'
  // export
  export default {
    data() {
      return {
      }
    },

    mounted(){
      let dplayer = new DPlayer({
        container: document.getElementById('dplayer'),
        video: {
          // url: require('../test.mp4'), //视频路径
          url: 'http://vjs.zencdn.net/v/oceans.mp4', //视频路径
          pic: require('@/assets/logo.png'), //视频封面
          thumbnails: require('@/assets/logo.png'), //视频缩略图
          type: 'auto'
        }
      })
      dplayer.seek('0'); //跳转到指定时间位置

      // 进行监听
      dplayer.on('play', function () {
          console.log("播放");
          dplayer.seek('0'); //跳转到指定时间位置
      });
      dplayer.on('pause', function () {
          console.log("暂停");
          console.log(dplayer.video.currentTime); //获取当前播放时间
      });
      dplayer.on('ended', function () {
          console.log("播放结束");
      });
      dplayer.on('error', function () {
          console.log("播放异常");
      });
    },
    methods: {
      
    }
  }
</script>
<style lang="scss" scoped>
.video_player{
  display: flex;
  justify-content: center;
}
::v-deep(.dplayer-danmaku-item) {
  span {
    border: none !important; //去掉弹幕边框
  }
}
</style>