import zhModeGroup from "./zhBase/zhModeGroup"

import zhControlLineGroup from "./zhComponent/zhControlLineGroup"
import zhControlPointGroup from "./zhComponent/zhControlPointGroup"

import zhEvent from "../define/zhEvent"

//这个Group 作为所有和图片算法内容相关展示的容器
class zhPanoramicGroup  extends zhModeGroup{	

	constructor(config ,iamge) {
		super(config ,iamge);

	}

	DealEvent(event)
	{
		if(event.e == zhEvent.zhEvent_ControlPointStart|| event.e == zhEvent.zhEvent_ControlPointMove || event.e == zhEvent.zhEvent_ControlPointEnd)
		{				
			let pointsDic = {}
			for (let index = 0; index < event.points.length; index++) {
				const point = event.points[index];
				let pointIndex = point.info.pointIndex;
				pointsDic[pointIndex] = {pointIndex:pointIndex,x:point.getX(),y:point.getY()}			
			}	
			this.UpdateGroup(pointsDic);

			// 事件进入撤销前进队列
			if(event.e == zhEvent.zhEvent_ControlPointStart)
			this.StartOperate(pointsDic);

			if(event.e == zhEvent.zhEvent_ControlPointEnd)
			this.FinishOperate(pointsDic);
		}
		else
		{
			super.DealEvent(event)			
		}
	}

	async Build()
	{
		this.ClearGroups()

		let shapes = this.algorithmRes.data.shapes;

		let controlPointArray = [];
		let controlLineOder = [];

		let pointIndex = 1000;
		for (const index in shapes) {

			let shape = shapes[index];
			let lineOder = []
			for (const key in shape.points) {
				
				const point = shape.points[key];	

				pointIndex ++;
				controlPointArray.push(this.AddPointConfigInfo({pointIndex:pointIndex,x:point[0],y:point[1]}))

				lineOder.push(pointIndex);
			}
			controlLineOder.push(lineOder);
		}

		this.controlLineGroup = zhControlLineGroup.Create({uniqueId:this.uniqueId});
		this.controlLineGroup.CreateLineArray({closed: true,needRandomColor :true,needFill:true},controlLineOder);

		this.controlPointGroup = zhControlPointGroup.Create({uniqueId:this.uniqueId},controlPointArray)
	    this.controlPointGroup.SetOderArray(controlLineOder)
		this.controlLineGroup.TieWithPointGroup(this.controlPointGroup)

		this.pointGroupArray.push(this.controlPointGroup);	
		this.lineGroupArray.push(this.controlLineGroup);

		
		this.AddGroups();


		this.SetAidPointVisible(false);	
	}



	static Create(uniqueId,image) {
		return new zhPanoramicGroup(uniqueId,image);
    }

}

export default zhPanoramicGroup;