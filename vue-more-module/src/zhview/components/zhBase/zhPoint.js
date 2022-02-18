import zhEvent from "../../define/zhEvent"

class zhPoint extends Konva.Circle{
	constructor(config,info) {

		super(config);

		this.info = info
		this.uniqueId = this.info.uniqueId
	}


	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// ********** 事件处理
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	AddEvent()
	{

		this.on("click", () => {	
			// 选择 select Point			
			this.fire(this.uniqueId,{e:zhEvent.zhEvent_MouseClickPoint,pointIndex:this.info.pointIndex},true);
		});

		this.on('mouseover', () => {

			// hover 进入 Point
			this.fire(this.uniqueId,{e:zhEvent.zhEvent_MouseOverPoint,pointIndex:this.info.pointIndex},true);	
		});

		this.on('mouseout', () => {

			// hover 移出 Point
			this.fire(this.uniqueId,{e:zhEvent.zhEvent_MouseOverPoint,pointIndex:0},true);
		});
		
		this.on("dragstart", () => {
			this.SetInfoDirty(true);
			if (this.DealEvent)this.DealEvent("dragstart")		
		});

		this.on("dragmove", () => {
			this.SetInfoDirty(true);
			if (this.DealEvent)this.DealEvent("dragmove")
		});

		this.on("dragend", () => {
			this.SetInfoDirty(true);
			if (this.DealEvent)this.DealEvent("dragend")

			// 点完成拖动后，触发一个撤销前进策略
			this.fire(this.uniqueId,{e:zhEvent.zhEvent_ControlPointOperate},true)
		});
	}

	RemoveEvent()
	{
		this.off("dragstart")
		this.off("dragmove")
		this.off("mouseout")		
		this.off("dragstart")
		this.off("dragmove")
		this.off("dragend")
	}

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// ********** 节点周期函数扩展
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	destroy()
	{
		this.RemoveEvent();
		super.destroy();
	}





	SetInfoDirty(isDirty)
	{
		this.info.dirty = isDirty;
	}

	IsInfoDirty()
	{
		return this.info.dirty;
	}

	IsKey()
	{
		return this.info.isKey;
	}

	GetPointIndex()
	{
		return this.info.pointIndex;
	}


	
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// ********** 更新点坐标 主要函数
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	UpdatePointPos(value)
	{
		this.setX(value.x)
		this.setY(value.y)
		this.SetInfoDirty(true);
	}
}

export default zhPoint;