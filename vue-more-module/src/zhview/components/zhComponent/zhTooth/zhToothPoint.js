import zhEvent from "../../../define/zhEvent"
import zhPoint from "../../zhBase/zhPoint"

class zhToothPoint extends zhPoint{

	constructor(info) {

		super({			
			x:info.x,
			y:info.y,
			radius : 2 ,//圆的半径
			fill : '#FFFFFF' ,//填充色
			stroke : '#F5D32F' ,//边框的颜色
			strokeWidth : 1,
			draggable : true,
			hitStrokeWidth : 5, 
		},info);

		this.AddEvent();
	}

	DealEvent(event)
	{
		if(event == "dragstart")
		{
			this.fire(this.uniqueId,{e:zhEvent.zhEvent_ToothPointStart,points:[this],info:this.info},true)
		}
		else if(event == "dragmove")
		{
			this.fire(this.uniqueId,{e:zhEvent.zhEvent_ToothPointMove,points:[this],info:this.info},true)
		}
		else if(event == "dragend")
		{
			this.fire(this.uniqueId,{e:zhEvent.zhEvent_ToothPointEnd,points:[this],info:this.info},true)
		}
	}

	
	// 静态方法 新建 zhToothPoint
	static Create(config={},info) {
		return new zhToothPoint(config,info);	
    }
}

export default zhToothPoint;