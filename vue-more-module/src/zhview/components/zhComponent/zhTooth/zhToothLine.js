import zhUtils from "../../../utils/utils"
import zhMathEx from "../../../utils/zhMathEx"
import zhEvent from "../../../define/zhEvent"
import zhLine from "../../zhBase/zhLine"

class zhToothLine extends zhLine{	

	constructor(config,info) {
		super(config,info);

		this.AddEvent();
	}


	CreateObject(config)
	{
		this.image = new Konva.Image(config)
		this.image.draggable(false)		
		this.setWidth(this.image.width())
		this.setHeight(this.image.height())
		this.add(this.image) 

		this.basePoints = {}

		this.info.points.forEach(point => {
			let p = new Konva.Circle({
				x:point.baseX,
				y:point.baseY,
				radius:0,
			})
			this.add(p)
			this.basePoints[point.name] = p
		});
	}


	AddEvent()
	{
		this.on("dragstart", () => {			
			this.CalculatePoints();	

			this.start = { x:this.getX(),y:this.getY()}	

			this.fire(this.uniqueId,{e:zhEvent.zhEvent_ToothStart,points:this.points,info:this.info},true)	
		});

		this.on("dragmove", () => {
			this.CalculatePoints();

			this.fire(this.uniqueId,{e:zhEvent.zhEvent_ToothMove,points:this.points,info:this.info},true)	
		});

		this.on("dragend", () => {
			this.CalculatePoints();
			

			this.end = { x:this.getX(),y:this.getY()};
			this.fire(this.uniqueId,{e:zhEvent.zhEvent_ToothEnd,points:this.points,info:this.info},true)

			this.fire(this.uniqueId,{e:zhEvent.zhEvent_ControlPointOperate},true)							
		});
	}

	DealEvent(event)
	{
		if(event == "dragend")
		{
			this.fire(this.uniqueId,{e:zhEvent.zhEvent_ToothEnd,points:this.points,info:this.info},true)
		}
	}

	UpDateLine()
	{
		if(this.IsNeedUpdate() == false) return;
		this.CalculateLine();

	}

	GetPointByName(name)
	{
		if(this.points == null) return;

		for (let index = 0; index < this.points.length; index++) {
			if(this.points[index].info.name == name)
			return this.points[index];	
		}
	}

	GetDirtyArray()
	{
		let dirtyArray = [];

		let pointC1 = this.GetPointByName("c1");
		if(pointC1 && pointC1.IsInfoDirty()) dirtyArray.push("c1");

		let pointC2 = this.GetPointByName("c2");
		if(pointC2 && pointC2.IsInfoDirty()) dirtyArray.push("c2");

		let pointC3 = this.GetPointByName("c3");
		if(pointC3 && pointC3.IsInfoDirty()) dirtyArray.push("c3");

		let pointC4 = this.GetPointByName("c4");
		if(pointC4 && pointC4.IsInfoDirty()) dirtyArray.push("c4");

		return dirtyArray;
	}

	CalculateLine()
	{
		let calculateArray=["c1","c2"];

		let dirtyArray = this.GetDirtyArray();

		if(dirtyArray.length == 1)
		{
			if (dirtyArray[0] == "c1")calculateArray=["c1","c2"];
			else if (dirtyArray[0] == "c2")calculateArray=["c1","c2"];
			else if (dirtyArray[0] == "c3")calculateArray=["c1","c3"];
			else if (dirtyArray[0] == "c4")calculateArray=["c1","c4"];		
		}

		let c1 = this.GetPointByName(calculateArray[0]);
		let c2 = this.GetPointByName(calculateArray[1]);

		if(c1 == undefined || c2 == undefined)
		{
			return;
		}

		let basePointC1 = {x:c1.info.baseX,y:c1.info.baseY};
		let basePointC2 = {x:c2.info.baseX,y:c2.info.baseY};
		let PointC1 = {x:c1.getX(),y:c1.getY()};
		let PointC2 = {x:c2.getX(),y:c2.getY()};

		let baseVector = zhMathEx.GetPointsVector(basePointC1,basePointC2)
		let pointVector = zhMathEx.GetPointsVector(PointC1,PointC2)
		
		let selfCenter = zhMathEx.GetPointsMid(basePointC1,basePointC2)
		let pointCenter = zhMathEx.GetPointsMid(PointC1,PointC2)

		zhUtils.SetAnchorPoint(this,selfCenter.x,selfCenter.y);
		zhUtils.SetPosition(this,pointCenter.x,pointCenter.y)

		let angle = zhMathEx.GetAngleBetweenVector(pointVector,baseVector)
		zhUtils.SetRotation(this,angle)

		let rate = zhMathEx.GetVectorLength(pointVector)/zhMathEx.GetVectorLength(baseVector)
		zhUtils.SetScale(this,rate);

		zhUtils.SetAnchorRate(this,0.5,0.5);

		this.CalculatePoints();

		if(dirtyArray.length == 1)
		{
			this.DealEvent("dragend");
		}		
	}
	
	CalculatePoints()
	{
		this.points.forEach(point => {
			let key = point.info.name;
			if(Object.hasOwnProperty.call(this.basePoints, key) )
			{
				let position = this.basePoints[key].getAbsolutePosition(this.getParent());				
				zhUtils.SetPosition(point,position.x,position.y)
			}
		});	

		this.PointsDirtyFinish();
	}


	static async CreateFromUrl(url,info)
	{
		let image =  await zhUtils.LoadImageFromUrl(url)
		return new zhToothLine({image:image,draggable :true},info)
	}
}

export default zhToothLine;