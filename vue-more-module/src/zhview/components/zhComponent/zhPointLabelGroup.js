import zhPointLabel from "./zhLabel/zhPointLabel" 

class zhPointLabelGroup extends Konva.Group{	

	constructor(config) {
		super(config);

		this.uniqueId = config.uniqueId
		this.labels = {}

		this.sceneSwitch = false ;
		this.selectPointIndex = 0;
		this.hoverPointIndex = 0;		
	}

	BuildLabelByPoints(pointArray)
	{
		if(this.labels == undefined) this.labels = {};
		
		for (const key in pointArray) {

			const point = pointArray[key];

			if(point.info.isKey == true)
			{
				let pointIndex = point.info.pointIndex ;

				let label  = zhPointLabel.Create(point.info,point);
				this.labels[pointIndex] = label ;
				this.add(label)
			}
		}		
	}

	destroy()
	{
		super.destroy();
	}

	SetSceneSwitch(isVisible)
	{
		this.sceneSwitch = isVisible;
		for (const key in this.labels) {
			this.labels[key].SetSceneSwitch(this.sceneSwitch);
		}

		if(isVisible)
		{
			if (Object.hasOwnProperty.call(this.labels, this.selectPointIndex))
			{
				this.labels[this.selectPointIndex].SetSelectSwitch(false);
				this.selectPointIndex = 0;
			}

			if (Object.hasOwnProperty.call(this.labels, this.hoverPointIndex))
			{
				this.labels[this.hoverPointIndex].SetHoverSwitch(false);
				this.hoverPointIndex = 0;
			}
		}
	}


	SetSelectPointIndex(selectIndex)
	{
		if (! Object.hasOwnProperty.call(this.labels, selectIndex) && selectIndex > 0)  return;

		if (Object.hasOwnProperty.call(this.labels, this.selectPointIndex))
		{
			this.labels[this.selectPointIndex].SetSelectSwitch(false);
			this.selectPointIndex = 0;
		}
		if(!this.sceneSwitch) this.selectPointIndex = selectIndex;

		if (Object.hasOwnProperty.call(this.labels, this.selectPointIndex))
		{
			this.labels[this.selectPointIndex].SetSelectSwitch(true);
		}		
	}

	SetHoverPointIndex(hoverIndex)
	{
		if (! Object.hasOwnProperty.call(this.labels, hoverIndex) && hoverIndex > 0)  return;

		if (Object.hasOwnProperty.call(this.labels, this.hoverPointIndex))
		{
			this.labels[this.hoverPointIndex].SetHoverSwitch(false);
			this.hoverPointIndex = 0;
		}
		if(!this.sceneSwitch) this.hoverPointIndex = hoverIndex;

		if (Object.hasOwnProperty.call(this.labels, this.hoverPointIndex))
		{
			this.labels[this.hoverPointIndex].SetHoverSwitch(true);
		}

	}

	UpdateLabelGroup(pointsDic,isFouce)
	{
		if(isFouce)
		{
			for (const key in this.labels) {
				this.labels[key].UpdateLabelPostion();
			}
		}
		else
		{
			for (const key in pointsDic) {
				if (Object.hasOwnProperty.call(this.labels, key)) {
					this.labels[key].UpdateLabelPostion();
				}
			}		
		}
		
	}

	// 静态方法 新建 zhPointLabelGroup
	static Create(config = {}) {	
		return   new zhPointLabelGroup(config);	
    }

}

export default zhPointLabelGroup;