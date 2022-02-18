import zhModeGroup from "./zhBase/zhModeGroup"

import zhControlLineGroup from "./zhComponent/zhControlLineGroup"
import zhControlPointGroup from "./zhComponent/zhControlPointGroup"
import zhToothLineGroup from "./zhComponent/zhToothLineGroup"
import zhToothPointGroup from "./zhComponent/zhToothPointGroup"
import zhUnusePointGroup from "./zhComponent/zhUnusePointGroup"
import zhPointLabelGroup from "./zhComponent/zhPointLabelGroup"

import zhEvent from "../define/zhEvent"

//这个Group 作为所有和图片算法内容相关展示的容器
class zhLateralGroup  extends zhModeGroup{	

	constructor(config ,iamge) {
		super(config ,iamge);
		this.selectPointIndex = 0;
		this.hoverPointIndex = 0;
	}

	DealEvent(event)
	{
		if(event.e == zhEvent.zhEvent_ControlPointStart|| event.e == zhEvent.zhEvent_ControlPointMove || event.e == zhEvent.zhEvent_ControlPointEnd)
		{				
			// 这里需要 vto 规则
			let pointsDic = {}
			for (let index = 0; index < event.points.length; index++) {
				const point = event.points[index];
				let pointIndex = point.info.pointIndex;
				pointsDic[pointIndex] = {pointIndex:pointIndex,x:point.getX(),y:point.getY()}			
			}	
			this.UpdateGroup(pointsDic);

			// 事件进入撤销前进队列
			if(event.e == zhEvent.zhEvent_ControlPointStart) {
				this.StartOperate(pointsDic);
				let stage = this.getStage()
				stage.container().style.cursor = 'url('+require('@/assets/img/fist.png')+'), auto'
			}

			if(event.e == zhEvent.zhEvent_ControlPointEnd) {
				this.StartOperate(pointsDic);
				let stage = this.getStage()
				stage.container().style.cursor = 'url('+require('@/assets/img/pointer.png')+'), auto'
			}
		}
		else if(event.e == zhEvent.zhEvent_ToothPointStart || event.e == zhEvent.zhEvent_ToothPointMove || event.e == zhEvent.zhEvent_ToothPointEnd)
		{				
			let pointsDic = {}
			for (let index = 0; index < event.points.length; index++) {
				const point = event.points[index];
				let pointIndex = point.info.pointIndex;
				pointsDic[pointIndex] = {pointIndex:pointIndex,x:point.getX(),y:point.getY()}			
			}
	
			this.UpdateGroup(pointsDic);

			// 事件进入撤销前进队列
			if(event.e == zhEvent.zhEvent_ToothPointStart) {
				this.StartOperate(pointsDic);
				let stage = this.getStage()
				stage.container().style.cursor = 'url('+require('@/assets/img/fist.png')+'), auto'
			}


			if(event.e == zhEvent.zhEvent_ToothPointEnd) {
				this.FinishOperate(pointsDic);
				let stage = this.getStage()
				stage.container().style.cursor = 'url('+require('@/assets/img/pointer.png')+'), auto'

			}

		}
		else if(event.e == zhEvent.zhEvent_ToothStart || event.e == zhEvent.zhEvent_ToothMove || event.e == zhEvent.zhEvent_ToothEnd)
		{	
			// 这里需要 vto 规则
			let pointsDic = {}
			for (let index = 0; index < event.points.length; index++) {
				const point = event.points[index];
				let pointIndex = point.info.pointIndex;
				pointsDic[pointIndex] = {pointIndex:pointIndex,x:point.getX(),y:point.getY()}			
			}
	
			this.UpdateGroup(pointsDic);

			// 事件进入撤销前进队列
			if(event.e == zhEvent.zhEvent_ToothStart)
			this.StartOperate(pointsDic);

			if(event.e == zhEvent.zhEvent_ToothEnd)
			this.FinishOperate(pointsDic);
		}
		else if(event.e == zhEvent.zhEvent_MouseClickPoint)
		{
			this.labelsGroup.SetSelectPointIndex(event.pointIndex);
			
			if(this.selectPointIndex>0) {
				let point = this.GetPointByPointIndex(this.selectPointIndex)
				if (event.pointIndex>0) {
					let selectPoint = this.GetPointByPointIndex(event.pointIndex)
					if(selectPoint.IsKey())
						point.setAttrs({'stroke':'#F5D32F', 'fill':'#FFFFFF'})
				}
				else {
					point.setAttrs({'stroke':'#F5D32F', 'fill':'#FFFFFF'})
					this.selectPointIndex = 0
				}
			}
			if(event.pointIndex>0) {
				let point = this.GetPointByPointIndex(event.pointIndex)
				if (point.IsKey()) {
					point.setAttrs({'stroke':'#E1277D', 'fill':'#E4BFD0'})
					this.selectPointIndex = event.pointIndex
				}
			}
		}
		else if(event.e == zhEvent.zhEvent_MouseOverPoint)
		{
			this.labelsGroup.SetHoverPointIndex(event.pointIndex);
			if(event.pointIndex>0) {
				let point = this.GetPointByPointIndex(event.pointIndex)
				point.setAttrs({'strokeWidth' : 0.5, 'radius' : 3})
				this.hoverPointIndex = event.pointIndex
			}
			else {
				let point = this.GetPointByPointIndex(this.hoverPointIndex)
				point.setAttrs({'strokeWidth' : 1, 'radius' : 2})
				this.hoverPointIndex = 0
			}
		}
		else
		{
			super.DealEvent(event)			
		}
	}


	SetToothConfigData(toothConfigRes)
	{
		this.toothConfigRes = toothConfigRes;
	}


	async Build()
	{
		this.ClearGroups();

		let algorithmKpsDic = this.algorithmRes.data.result.kps;
		let vertebraeArray = this.algorithmRes.data.result.vertebrae;

		let configLineArray = this.pointsRes.data.line;
		let toothConfigArray = this.toothConfigRes.data;

		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
		// 找出成气道点
		let airwayPointArray = [];
		let airwayLineOder = [];

		let basePointIndex = 1000;
		for (const key in vertebraeArray) {
			const vertebrae = vertebraeArray[key];

			let lineOder = []
			for (const index in vertebrae) {
				const point = vertebrae[index];	

				basePointIndex ++;
				airwayPointArray.push(this.AddPointConfigInfo({pointIndex:basePointIndex,x:point[0],y:point[1]}))

				lineOder.push(basePointIndex);
			}
			airwayLineOder.push(lineOder);
		}

		this.airwayLineGroup = zhControlLineGroup.Create({uniqueId:this.uniqueId})
		this.airwayLineGroup.CreateLineArray({stroke:"#ffff00ff",closed: true,fill:"#ffff0088"},airwayLineOder)
		this.airwayPointGroup = zhControlPointGroup.Create({uniqueId:this.uniqueId},airwayPointArray)
		this.airwayPointGroup.SetOderArray(airwayLineOder)
		this.airwayLineGroup.TieWithPointGroup(this.airwayPointGroup)


		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
		//找出牙齿点
		this.toothLineGroup = zhToothLineGroup.Create({uniqueId:this.uniqueId});
		await this.toothLineGroup.CreateLineArray({},toothConfigArray);

		let toothPointArray = []
		let toothIndex = 0;
		for (const key in toothConfigArray) {
			if (Object.hasOwnProperty.call(toothConfigArray, key)) {
				const toothConfig = toothConfigArray[key];

				const pointsArray = toothConfig.points;

				for (let index = 0; index < pointsArray.length; index++) {
					let point = pointsArray[index];

					if(Object.hasOwnProperty.call(algorithmKpsDic, point.pointIndex))						
					{
						let info = {toothIndex:toothIndex,x:algorithmKpsDic[point.pointIndex][0],y:algorithmKpsDic[point.pointIndex][1]};
						point = Object.assign(point,info)
					}

					toothPointArray.push(this.AddPointConfigInfo(point))
				}	
				
				toothIndex++;
			}
		}

		this.toothPointGroup = zhToothPointGroup.Create({uniqueId:this.uniqueId},toothPointArray)
		this.toothLineGroup.TieWithPointGroup(this.toothPointGroup)

		

		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
		// 找出线上的点

		let controlPointArray = [];
		let controlLineOder = [];

		for (const key in configLineArray) {
			if (Object.hasOwnProperty.call(configLineArray, key)) {
				const lineData = configLineArray[key];
				
				let lineOder = []
				for (let index = 0; index < lineData.length; index++) {
					const pointIndex = lineData[index];

					if (Object.hasOwnProperty.call(algorithmKpsDic, pointIndex)) {
						const point = algorithmKpsDic[pointIndex];						
						controlPointArray.push(this.AddPointConfigInfo({pointIndex:pointIndex,x:point[0],y:point[1]}))
						lineOder.push(pointIndex);
					}										
				}
				controlLineOder.push(lineOder)
			}
		}

		this.controlLineGroup = zhControlLineGroup.Create({uniqueId:this.uniqueId})
		this.controlLineGroup.CreateLineArray({stroke:"#18ACFF"},controlLineOder)
		this.controlPointGroup = zhControlPointGroup.Create({uniqueId:this.uniqueId},controlPointArray)
		this.controlPointGroup.SetOderArray(controlLineOder)
		this.controlLineGroup.TieWithPointGroup(this.controlPointGroup)

		
		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
		// 未使用的点

		let unuseKeyPoints = []	
		for (const pointIndex in algorithmKpsDic) {
			if (Object.hasOwnProperty.call(algorithmKpsDic, pointIndex)) {
				const point = algorithmKpsDic[pointIndex];

				if(this.toothPointGroup.IsContainPointIndex(pointIndex) == false && this.controlPointGroup.IsContainPointIndex(pointIndex) == false)
				{
					unuseKeyPoints.push(this.AddPointConfigInfo({pointIndex:pointIndex,x:point[0],y:point[1]}))
				}			
			}
		}
		
		this.unusePointGroup = new zhUnusePointGroup({uniqueId:this.uniqueId},unuseKeyPoints);

		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
		// Label 层

		this.labelsGroup = new zhPointLabelGroup({uniqueId:this.uniqueId});
		this.labelsGroup.BuildLabelByPoints(this.controlPointGroup.GetPoints())
		this.labelsGroup.BuildLabelByPoints(this.toothPointGroup.GetPoints())
		this.labelsGroup.BuildLabelByPoints(this.unusePointGroup.GetPoints())



		// 添加线的层

		this.pointGroupArray.push(this.airwayPointGroup);
		this.pointGroupArray.push(this.controlPointGroup);
		this.pointGroupArray.push(this.toothPointGroup);	
		this.pointGroupArray.push(this.unusePointGroup);	
		

		this.lineGroupArray.push(this.airwayLineGroup);
		this.lineGroupArray.push(this.controlLineGroup);
		this.lineGroupArray.push(this.toothLineGroup);	

		
		this.AddGroups();


		this.StartLateral()
	}

	StartLateral()
	{
		this.HideGroups();

		if(this.controlLineGroup) this.controlLineGroup.show();
		if(this.toothLineGroup) this.toothLineGroup.show();
		if(this.controlPointGroup) this.controlPointGroup.show();
		if(this.toothPointGroup) this.toothPointGroup.show();
		this.SetAidPointVisible(false);
		//if(this.unusePointGroup) this.unusePointGroup.show();
		if(this.labelsGroup) this.labelsGroup.show();

		this.UpdateGroup();

		let stage = this.getStage()
		stage.container().style.cursor = 'url('+require('@/assets/img/pointer.png')+'), auto'
	}

	StartAirway()
	{
		this.HideGroups();
	
		//if(this.airwayPointGroup) this.airwayPointGroup.show();
		if(this.airwayLineGroup) this.airwayLineGroup.show();

		this.UpdateGroup();
	}

	static Create(uniqueId,image) {
		return new zhLateralGroup(uniqueId,image);
    }

}

export default zhLateralGroup;