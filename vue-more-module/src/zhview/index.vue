<template>
	<div id="zh_container"></div>
</template>
 
<script>
import {defineComponent,reactive,toRefs,onMounted,onUnmounted,watchEffect} from "vue";
import {AsyncHttpRequest} from "@/request/home/request.js"
import {getCaseFileService} from '@/request/file/fileService'
import { getUrnImage } from "@/request/file/download";

import md5 from 'js-md5';


import zhAnalysis from "@/zhview/components/zhAnalysis"
import zhLateralGroup from "@/zhview/components/zhLateralGroup"
import zhPanoramicGroup from "@/zhview/components/zhPanoramicGroup"
import zhUtils from "@/zhview/utils/utils"


export default defineComponent ({
	props: {
        info: {
            type: Object,
            default: {},
        },
    },

	setup(props, context) {

		const data = reactive({
			stage:null,
			configKonva: {
				width: 1000,
				height: 1000
			}
		});

		let analysis = null;
		let group = null;

		onMounted(async ()=>{
			console.log(props.info)

			let  res =  await getCaseFileService(props.info.RecordId);
			console.log(res);

			let Urn = res.Files[7].Urn;
			
			let uniqueId =  md5(Urn)
			// 初始化 stage
			analysis = zhAnalysis.Create({
				container: 'zh_container',
				width: 1000,
				height: 1000,
				uniqueId:uniqueId
			})
			// analysis.stage.container().style.cursor = 'url('+require('@/assets/img/Fill.png')+'), auto'

			////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			// 全景片demo
			// let image =  await zhUtils.LoadImageFromUrl('https://www.nastuki.com/zh/panoramic/1.jpg');			
			// group = zhPanoramicGroup.Create(uniqueId,image)
			// analysis.AddChild(group)

			// let algorithmRes = await AsyncHttpRequest('https://www.nastuki.com/zh/panoramic/1.json');
			// group.SetAlgorithmConfig(algorithmRes);
			// group.Build()



			////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			// 侧位片demo
			// 先创建图片
	    	let image =  await zhUtils.LoadImageFromUrl('https://www.nastuki.com/zh/1.jpg');
			//let path = res.Files[7].Path;
			//let imageFromUrn = await getUrnImage(path);
			//let image =  await zhUtils.LoadImageFromBase64(imageFromUrn)
			group = zhLateralGroup.Create(uniqueId,image)		
			analysis.AddChild(group)

			let algorithmRes = await AsyncHttpRequest('https://www.nastuki.com/zh/1.json');
			let pointsRes = await AsyncHttpRequest('https://www.nastuki.com/zh/config.json');
			let toothConfigRes = await AsyncHttpRequest('https://www.nastuki.com/zh/tooth/tooth2.json');

			group.SetAlgorithmConfig(algorithmRes);
			group.SetPointsConfig(pointsRes);
			group.SetToothConfigData(toothConfigRes)
			group.Build()


			////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
			//group.SetFlipX(true);
			//group.SetFlipY(true);

			// this.scale -= 0.1;
			// this.group.setScale(this.scale);
			// this.angle += 20;
			// this.group.RotateAngle(this.angle);

			// this.group.UndoOperate();
			// this.group.RedoOperate();

			// this.group.StartLateral();
			// this.group.StartAirway();

			// this.group.GetVersionData();
			// this.group.SetVersioData();

			// group.SetImageVisible(false);
			// group.SetLabelsVisible(true);
			// group.SetKeyPointVisible(true);

		});


		onUnmounted(()=>{
			analysis.destory();
		})
	}
});

</script>
<style lang='scss' scoped>
.dv{
	width: 100%;
	height: 100%;
	border: 1px solid black;
}
  
</style>