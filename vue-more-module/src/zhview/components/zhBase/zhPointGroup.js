class zhPointGroup extends Konva.Group{	

	constructor(config,pointArray) {
		super(config);

		this.uniqueId = config.uniqueId

		this.keyPointVisible = true;
	    this.aidPointVisible = true;

		this.InitPointArray(pointArray);
	}


	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// ********** 节点周期函数扩展
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	destroy()
	{
		super.destroy();
	}

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// ********** 新建点组 要求格式 {pointIndex:{XXXXXXX}}
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	InitPointArray(pointArray)
	{
		this.points = {}
	
		for (let index = 0; index < pointArray.length ; index++) {

			if(Object.hasOwnProperty.call(this.points, pointArray[index].pointIndex) == false)
			{
				// 需要子类实现
				if(this.CreatePoint)this.CreatePoint(pointArray[index])
			}
		}
	}

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// ********** 点的处理
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	AddPoint(point)
	{
		this.points[point.info.pointIndex] = point;
		this.add(point);
	}

	GetPoints()
	{
		return this.points;
	}

	IsContainPointIndex(pointIndex)
	{
		return Object.hasOwnProperty.call(this.points, pointIndex)
	}

	GetPointByPointIndex(pointIndex)
	{
		if(this.IsContainPointIndex(pointIndex))
		{
			return this.points[pointIndex]
		}
	}

	UpdatePointsDic(pointsDic)
	{		
		for (const key in pointsDic) {

			const pointInfo = pointsDic[key];
			
			if(this.points!= null && Object.hasOwnProperty.call(this.points, pointInfo.pointIndex))
			{
				this.points[pointInfo.pointIndex].UpdatePointPos(pointInfo);
			}
		}
	}

	GetPointsVersionDic()
	{
		let versionDic = {}
		for (const key in  this.points) {			
			const point = this.points[key];
			versionDic[key.toString()] = { pointIndex:key.toString(),x:point.getX(),y:point.getY()};		
		}

		return versionDic;
	}


	SetKeyPointsVisible(isVisible)
	{
		this.keyPointVisible = isVisible;
		this.RefreshPointsVisible();
	}

	SetAidPointsVisible(isVisible)
	{
		this.aidPointVisible = isVisible;
		this.RefreshPointsVisible();
	}

	RefreshPointsVisible()
	{
		for (const key in  this.points) {			
			const point = this.points[key];
			if(point.IsKey()){point.visible(this.keyPointVisible);}
			if(! point.IsKey()){point.visible(this.aidPointVisible);}
		}
	}
}

export default zhPointGroup;