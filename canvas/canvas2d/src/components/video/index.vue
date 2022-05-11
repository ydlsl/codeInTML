<template>
  <div class="video-container">
    <div v-for="page in pageList" :key="page">
      <el-button size="small" @click="setPage(page)">{{page}}</el-button>
    </div>
  </div>
  <div class="padding">测试</div>
  <component :is="page"></component>
</template>

<script>
import VideoHtml from './htmlVideo/htmlVideo.vue'
import VideoFlv from './flv/index.vue'
import VideoPlayer from './player/indev.vue'
import VideoFlvHls from './flvhls/index.vue'
import Dplayer from './dplayer/index.vue'
import Plyr from './plyr/index.vue'
export default  {
  components: {
    videoHtml: VideoHtml,
    videoFlv: VideoFlv,
    'vue-video-player': VideoPlayer,
    'video+flv/hls': VideoFlvHls,
    dplayer: Dplayer,
    plyr: Plyr
  },
  data() {
    return {
      pageList: ['videoHtml','vue-video-player','videoFlv','video+flv/hls', 'dplayer', 'plyr'],
      page: 'videoHtml'
    }
  },
  methods: {
    setPage(page){
      this.page = page
    }
  }
}
</script>

<style lang='scss' scoped>
.video-container{
  display: flex;
  justify-content: space-evenly;
}
.padding{
  margin: 5px;
}
</style>