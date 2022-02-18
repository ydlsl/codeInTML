import zhEvent from "../../../define/zhEvent"
import zhPoint from "../../zhBase/zhPoint"


class zhControlPoint extends zhPoint{
	constructor(info) {
		super({			
			x:info.x,
			y:info.y,
			radius : 2 ,//圆的半径
			fill : '#BAE7FF' ,//填充色
			stroke : '#18ACFF' ,//边框的颜色
			strokeWidth : 1,
			draggable : true,
			hitStrokeWidth : 5, 
		},info);
		if(this.IsKey()){
			this.setAttrs({'stroke' : '#F5D32F', 'fill' : '#FFFFFF'})
		}

		this.AddEvent();
	}

	DealEvent(event)
	{		
		if(event == "click")
		{
			
		}
		else if(event == "mouseover")
		{
			
		}
		else if(event == "dragstart")
		{
			this.fire(this.uniqueId,{e:zhEvent.zhEvent_ControlPointStart,points:[this],info:this.info},true)
		}
		else if(event == "dragmove")
		{
			this.fire(this.uniqueId,{e:zhEvent.zhEvent_ControlPointMove,points:[this],info:this.info},true)
		}
		else if(event == "dragend")
		{
			this.fire(this.uniqueId,{e:zhEvent.zhEvent_ControlPointEnd,points:[this],info:this.info},true)
		}
		
	}


	// 静态方法 新建 zhControlPoint
	static Create(info) {
		return new zhControlPoint(info);	
    }
}

export default zhControlPoint;