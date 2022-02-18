import zhUtils from "../../utils/utils"
import zhEvent from "../../define/zhEvent"
import zhOperate from "../../define/zhOperate"


//这个 zhModeGroup 作为所有和图片算法内容相关展示的容器的基类
class zhModeGroup extends Konva.Group{	

	constructor(uniqueId ,image) {
		super({})

		// 唯一标识，用于事件通知
		this.uniqueId = uniqueId
		
		// 建立图片
		this.image = new Konva.Image({image:image})
		this.setWidth(this.image.width())
		this.setHeight(this.image.height())
		this.draggable(true);
		this.add(this.image)
		zhUtils.SetAnchorRate(this,0.5,0.5);

		// 所有层级均为点组,线组，label组
		this.pointGroupArray = [];
		this.lineGroupArray = [];
		this.labelsGroup = null;

		//当前模块名字 （主要在侧位片使用）
		this.zhModeName = "";

		// 撤销前进主控制器
		this.operateList = [];
		this.operateIndex = -1;

		// 控制镜像
		this.flipX = false;
		this.flipY = false;

		
		// 场景控制开关
		this.imageVisible = true;
		this.keyPointVisible = true;
		this.aidPointVisible = true;
		this.lineVisible = true;
		this.labelVisible = false;

		
		// 添加事件
		this.AddEvent();
		// 保存外层传递进来的callback 函数指针
		this.callback = null;
	}

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// ********** 事件处理
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	// 添加事件
	AddEvent()
	{
		// 点击图片触发 选择pointIndex为0事件 
		this.image.on("click",()=>{
			this.fire(this.uniqueId,{e:zhEvent.zhEvent_MouseClickPoint,pointIndex:0},true);
		})

		// 接受下层传上来的所有事件
		this.on(this.uniqueId,(event)=>{

			//处理事件
			this.DealEvent(event);

			// 若有回调，回调给外面
			if(this.callback) this.callback(event);
		})
	}


	// 设置撤销前进操作原始状态
	StartOperate(pointsDic)
	{
		this.originOperate = pointsDic ;
	}

	// 设置撤销前进操作完成状态
	FinishOperate(pointsDic)
	{
		this.finishOperate = pointsDic ;
	}


	//处理事件
	DealEvent(event)
	{

		// 撤销前进逻辑
		if(event.e == zhEvent.zhEvent_ControlPointOperate)
		{
			// 向队列新增一个操作，要把当前执行的 index 之后的操作清空
			if(this.operateIndex + 1  < this.operateList.length)
			{
				for (let i = this.operateList.length - 1; i > this.operateIndex ; i--) {
					this.operateList.splice(i, 1);
				}
			}

			this.operateList.push(new zhOperate(zhEvent.zhEvent_ControlPointOperate,{origin:this.originOperate,finish:this.finishOperate})) ;
			this.operateIndex ++;
		}
	}

	// 移除事件
	RemoveEvent()
	{
		// 和 AddEvent需要对应
		this.off(this.uniqueId);
		this.image.off("click");

		if(this.callback) this.callback = null;
	}

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// ********** 节点周期函数扩展
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 销毁节点
	destroy()
	{
		this.RemoveEvent();
		super.destroy();
	}


	// 更新节点
	UpdateGroup(pointsDic = {},isForce = false)
	{
		for (let index = 0; index < this.pointGroupArray.length; index++) {
			this.pointGroupArray[index].UpdatePointsDic(pointsDic);			
		}

		for (let index = 0; index < this.lineGroupArray.length; index++) {
			this.lineGroupArray[index].UpdateGroup();			
		}

		if(this.labelsGroup) this.labelsGroup.UpdateLabelGroup(pointsDic,isForce);		
	}

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// ********** 设置配置
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	// 设置算法返回的配置
	SetAlgorithmConfig(algorithmRes)
	{
		this.algorithmRes = algorithmRes	
	}

	// 设置点配置表
	SetPointsConfig(pointsRes)
	{
		this.pointsRes = pointsRes		
	}

	// 设置版本数据
	SetVersioData(versionRes)
	{
		this.versionRes = versionRes

		// todo
		let versionData  = { 100021: {pointIndex:100021,x:608.8400268554688,y:228.5500030517578}};

		this.UpdateGroup(versionData,true)
	}

	// 创建点的时候增加点的配置
	AddPointConfigInfo(info)
	{
		let pointIndex = info.pointIndex;

		if(this.pointsRes && Object.hasOwnProperty.call(this.pointsRes.data.point, pointIndex))
		{
			let configPointDic = this.pointsRes.data.point;
			info.isKey = true;
			info.cn = configPointDic[pointIndex].cn ;
			info.en = configPointDic[pointIndex].en ;
		}
		else
		{
			info.isKey = false;
		}

		info.uniqueId = this.uniqueId;

		return info;
	}
	


	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// ********** 操作组
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	// 清空组的信息
	ClearGroups()
	{
		for (let index = 0; index < this.pointGroupArray.length; index++) {
			this.pointGroupArray[index].destroy();			
		}

		for (let index = 0; index < this.lineGroupArray.length; index++) {
			this.lineGroupArray[index].destroy();			
		}

		if(this.labelsGroup) this.labelsGroup.destroy();

		this.pointGroupArray = [];		
		this.lineGroupArray = [];
		this.labelsGroup = null;
	}
	
	// 隐藏组的信息
	HideGroups()
	{
		for (let index = 0; index < this.pointGroupArray.length; index++) {
			this.pointGroupArray[index].hide();			
		}

		for (let index = 0; index < this.lineGroupArray.length; index++) {
			this.lineGroupArray[index].hide();			
		}

		if(this.labelsGroup) this.labelsGroup.hide();
	}

	// 将组添加进来
	AddGroups()
	{
		
		for (let index = 0; index < this.lineGroupArray.length; index++) {
			this.add(this.lineGroupArray[index]);			
		}

		for (let index = 0; index < this.pointGroupArray.length; index++) {
			this.add(this.pointGroupArray[index]);			
		}

		if(this.labelsGroup)this.add(this.labelsGroup);
	}

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// ********** 获取开关
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	IsFlipX()
	{
		return  this.flipX
	}

	IsFlipY()
	{
		return  this.flipY
	}



	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// ********** 外部对内部操作 
	// 控制组件开关
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	// 设置图片显示隐藏 的开关
	SetImageVisible(isVisible)
	{
		this.imageVisible = isVisible;
		this.image.visible(this.imageVisible);
	}

	// 设置关键点 的开关
	SetKeyPointVisible(isVisible)
	{
		this.keyPointVisible = isVisible;	
		
		for (let index = 0; index < this.pointGroupArray.length; index++) {
			this.pointGroupArray[index].SetKeyPointsVisible(this.keyPointVisible);			
		}		
	}

	// 设置辅助点 的开关
	SetAidPointVisible(isVisible)
	{
		this.aidPointVisible = isVisible;

		for (let index = 0; index < this.pointGroupArray.length; index++) {
			this.pointGroupArray[index].SetAidPointsVisible(this.aidPointVisible);			
		}
	}

	// 设置labelgroup 的开关
	SetLabelsVisible(isVisible)
	{
		this.labelVisible = isVisible;

		if(this.labelsGroup)this.labelsGroup.SetSceneSwitch(isVisible);
	}


	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// ********** 外部对内部操作 
	// 版本相关
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	// 获取所有点
	GetPointsDic()
	{
		let  pointsDic = {}
		for (let index = 0; index < this.pointGroupArray.length; index++) {

			pointsDic = Object.assign(pointsDic,this.pointGroupArray[index].GetPointsVersionDic()) ;		
		}	
		return pointsDic ;	
	}
	GetPointByPointIndex(pointIndex)
	{
		let point = null
		for (let index = 0; index < this.pointGroupArray.length; index++) {
			point = this.pointGroupArray[index].GetPointByPointIndex(pointIndex);
			if(point) {
				return point
			}
		}	
		return ;		
	}
	// 获取版本信息 
	GetVersionData()
	{
		// todo
		return  JSON.stringify(this.GetPointsDic());
	}



	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// ********** 外部对内部操作 
	// 撤销前进
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	// 撤销
	UndoOperate()
	{
		if(this.operateIndex >= 0)
		{
			let operate = this.operateList[this.operateIndex]

			if(this.UpdateGroup)this.UpdateGroup(operate.value.origin);

			this.operateIndex --;
		}		
	}

	// 前进
	RedoOperate()
	{
		if(this.operateIndex < this.operateList.length -1)
		{
			this.operateIndex ++ ;

			let operate = this.operateList[this.operateIndex]

			if(this.UpdateGroup)this.UpdateGroup(operate.value.finish);
		}		
	}

	
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// ********** 外部对内部操作 
	// 旋转 缩放 镜像
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	SetFlipX(isFlipX)
	{
		if(this.flipX == isFlipX) return;

		this.flipX = isFlipX;

		this.setScaleX(this.getScaleX())

		if(this.UpdateGroup)this.UpdateGroup({},true);
	}

	SetFlipY(isFlipY)
	{
		if(this.flipY == isFlipY) return;

		this.flipY = isFlipY;

		this.setScaleY(this.getScaleY())

		if(this.UpdateGroup)this.UpdateGroup({},true);
	}

	setScale(scale,centerPoint = {x:0.5,y:0.5})
	{
		this.setScaleX(scale,centerPoint)
		this.setScaleY(scale,centerPoint)

		if(this.UpdateGroup)this.UpdateGroup({},true);
	}

	setScaleX(scale,centerPoint = {x:0.5,y:0.5})
	{
		zhUtils.SetAnchorRate(this,centerPoint.x,centerPoint.y);
		scale *= (this.flipX==true)?-1:1;
		super.setScaleX(scale)

		if(this.UpdateGroup)this.UpdateGroup({},true);
	}

	setScaleY(scale,centerPoint = {x:0.5,y:0.5})
	{
		zhUtils.SetAnchorRate(this,centerPoint.x,centerPoint.y);
		scale *= (this.flipY==true)?-1:1;
		super.setScaleY(scale)

		if(this.UpdateGroup)this.UpdateGroup({},true);
	}

	// 旋转角度
	RotateAngle(angle,centerPoint = {x:0.5,y:0.5})
	{
		zhUtils.SetAnchorRate(this,centerPoint.x,centerPoint.y);
		this.setRotation(angle) ;

		if(this.UpdateGroup)this.UpdateGroup({},true);
	}

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// ********** 外部对内部操作 
	// 设置外面回调
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	SetEventCallback(callback)
	{
		this.callback = callback;
	}
	

}

export default zhModeGroup;