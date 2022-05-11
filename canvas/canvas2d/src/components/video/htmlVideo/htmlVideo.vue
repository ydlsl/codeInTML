<template>
  <div class="video_player">
    <video src="../test.mp4">你的浏览器不支持播放该视频</video>
    <div class="video-click"></div>
    <div class="menu">
      <div class="play">播放</div>
      <div class="time">00:00/00:00</div>
      <!-- 进度条 -->
      <div class="progress_var">
        <!-- 已播放的进度 -->
        <div></div>
        <!-- 播放的标记点 -->
        <i></i>
        <!-- 音量 -->
      </div>
      <!-- <div class="volume">
        <div id="v_down">音量-</div>
        <div id="v_up">音量+</div>
      </div> -->
      <!-- 倍速 -->
      <div id="speed">
        <select id="speed_choose">
          <option value="0.5">0.5倍</option>
          <option value="1.0" selected>1.0倍</option>
          <option value="1.25">1.25倍</option>
          <option value="1.5">1.5倍</option>
          <option value="2.0">2.0倍</option>
        </select>
      </div>
      <!-- 全屏 -->
      <div class="view">全屏</div>
    </div>
  </div>
  <!-- https://blog.csdn.net/RoddyLD/article/details/115449040 -->
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  mounted() {
    var video = document.getElementsByTagName("video")[0]
    var play = document.getElementsByClassName("play")[0]
    var videoClick = document.getElementsByClassName("video-click")[0]
    var time = document.getElementsByClassName("time")[0]
    var progress = document.getElementsByClassName("progress_var")[0]
    var v_up = document.getElementById("v_up")
    var v_down = document.getElementById("v_down")
    var speed_choose = document.getElementById("speed_choose")
    var view = document.getElementsByClassName("view")[0]

    videoClick.onclick = function () {
      if (video.paused) {
        video.play()
        play.innerHTML = "暂停"
      } else {
        video.pause()
        play.innerHTML = "播放"
      }
    }
    play.onclick = function () {
      if (video.paused) {
        video.play()
        this.innerHTML = "暂停"
      } else {
        video.pause()
        this.innerHTML = "播放"
      }
    }
    var timer = setInterval(function () {
      // 获取视频的总时长 播放的时间
      var total = video.duration
      var nowTime = video.currentTime
      // 将时间设置到页面
      time.innerHTML =
        "0" +
        parseInt(nowTime / 60) +
        ":" +
        "0" +
        parseInt(nowTime % 60) +
        "/" +
        "0" +
        parseInt(total / 60) +
        ":" +
        "0" +
        parseInt(total % 60)
      if (parseInt(nowTime % 60) >= 10) {
        time.innerHTML =
          "0" +
          parseInt(nowTime / 60) +
          ":" +
          parseInt(nowTime % 60) +
          "/" +
          "0" +
          parseInt(total / 60) +
          ":" +
          "0" +
          parseInt(total % 60)
      }
      // 获取进度条总宽度  20/60 * 总宽度
      // 当前播放节点  20
      // 总时长  60
      var owidth = (nowTime / total) * progress.clientWidth

      // 改变进度条的位置
      progress.children[0].style.width = owidth + "px"
      progress.children[1].style.left = owidth + "px"
    }, 30)

    // 点击进度条 跳转
    progress.onclick = function (e) {
      var total = video.duration
      var nowTime = video.currentTime
      progress.children[0].style.width = e.offsetX + "px"
      progress.children[1].style.left = e.offsetX + "px"
      // 对应的播放时间
      // 当前点击位置 / 进度条的总宽度 * 总时长
      video.currentTime = (e.offsetX / progress.clientWidth) * video.duration
      // 计算出来的时间 渲染到页面
      time.innerHTML =
        "0" +
        parseInt(nowTime / 60) +
        ":" +
        parseInt(nowTime % 60) +
        "/" +
        "0" +
        parseInt(total / 60) +
        ":" +
        "0" +
        parseInt(total % 60)
    }
    //加声音
    if(v_up)
    v_up.onclick = function () {
      if (video.volume == 1) {
        console.log(video.volume)
      } else {
        video.volume = Math.round((video.volume + 0.1) * 10) / 10
        console.log(video.volume)
      }
    }
    //减声音
    if(v_down)
    v_down.onclick = function () {
      if (video.volume == 0) {
        console.log(video.volume)
      } else {
        video.volume = Math.round((video.volume - 0.1) * 10) / 10
        console.log(video.volume)
      }
    }
    //调整倍速
    speed_choose.onchange = function () {
      video.playbackRate = speed_choose.value
    }
    //设置全屏播放
    view.onclick = function () {
      video.webkitRequestFullScreen()
    }
  },
}
</script>

<style lang="scss" scoped>
.video_player {
  width: 890px;
  height: 500px;
  margin: 0px auto;
  text-align: center;
  position: relative;
}
video {
  width: 890px;
  height: 500px;
  position: absolute;
  top: 0;
  left: 0;
}
.video-click{
  width: 100%;
  height: calc(100% - 50px);
  position: absolute;
  top: 0;
  left: 0;
  &:hover{
    background-color: rgba(0, 0, 0, 0.5);
  }
}
.menu {
  width: 100%;
  height: 50px;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
.video_player:hover .menu {
  display: block;
  cursor: pointer;
}
.play {
  width: 60px;
  height: 30px;
  border: 1px solid #fff;
  position: absolute;
  top: 50%;
  margin-top: -15px;
  margin-left: 20px;
  line-height: 30px;
  border-radius: 10px;
  border-color: white;
  color: white;
  cursor: pointer;
}
.play:hover {
  border-color: hotpink;
  color: hotpink;
}
.time {
  width: 100px;
  height: 30px;
  position: absolute;
  top: 50%;
  margin-top: -15px;
  margin-left: 100px;
  line-height: 30px;
  color: white;
}
.progress_var {
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: snow;
  left: 0;
  top: -2px;
}
.progress_var div {
  position: absolute;
  height: 2px;
  background-color: hotpink;
  width: 120px;
  left: 0;
  top: 0;
}
.progress_var i {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background-color: #fff;
  left: 120px;
  top: -2px;
}
.progress_var:hover {
  height: 7px;
  top: -4px;
}
.progress_var:hover div {
  height: 7px;
  top: 0px;
}
.progress_var:hover i {
  height: 11px;
  width: 11px;
  border-radius: 11;
  top: -2px;
}
.volume {
  width: 190px;
  height: 50px;
  position: absolute;
  left: 350px;
  top: 10px;
}
.volume div {
  width: 60px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  position: absolute;
  border: 1px solid white;
  border-radius: 10px;
  color: white;
  cursor: pointer;
}
.volume:hover div {
  border-color: hotpink;
  color: hotpink;
}
.volume div:nth-child(2) {
  left: 70px;
}
#speed {
  width: 100px;
  height: 30px;
  position: absolute;
  left: 600px;
  top: 10px;
}
#speed_choose {
  border: 1px solid transparent;
  border-radius: 0.5em;
}

.view {
  position: absolute;
  width: 60px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  position: absolute;
  border: 1px solid white;
  border-radius: 10px;
  color: white;
  cursor: pointer;
  right: 20px;
  top: 20%;
}
.view:hover {
  border-color: hotpink;
  color: hotpink;
}
</style>
