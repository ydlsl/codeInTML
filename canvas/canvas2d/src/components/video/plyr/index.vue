<template>
  <PlyrVideo :options="options">
    <video 
      controls crossorigin 
      playsinline 
      data-poster="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg"
    >
			<source
				size="576"
				src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
				type="video/mp4"
			/>
			<source
				size="720"
				src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4"
				type="video/mp4"
			/>
			<source
				size="1080"
				src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4"
				type="video/mp4"
			/>
			<source
				size="1440"
				src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1440p.mp4"
				type="video/mp4"
			/>
			<track
				default
				kind="captions"
				label="English captions"
				src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.en.vtt"
				srclang="en"
			/>
			<track
				kind="captions"
				label="Légendes en français"
				src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.fr.vtt"
				srclang="fr"
			/>
			<a
				download=""
				href="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4"
			>
				Download
			</a>
    </video>
  </PlyrVideo>
</template>
 <!-- 
   npm install vue-plyr
  -->
<script>
// 配置内容 配置项看下文
import { PlyrVideo } from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css'
 
export default {
  components: {
    PlyrVideo
  },
  data() {
    return {
      options: {
        i18n: {
          speed: '速度',
          normal: '正常'
        },
				type: 'video',
				title: 'View From A Blue Moon',
				
				poster: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg',
				tracks: [
					{
						kind: 'captions',
						label: 'English',
						srclang: 'en',
						src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.en.vtt',
						default: true,
					},
					{
						kind: 'captions',
						label: 'French',
						srclang: 'fr',
						src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.fr.vtt',
					},
				],
				previewThumbnails: {
					src: ['https://cdn.plyr.io/static/demo/thumbs/100p.vtt', 'https://cdn.plyr.io/static/demo/thumbs/240p.vtt'],
				},
			},
    }
  },
}
</script>
