class zhRegionLabel extends Konva.Label{

	constructor(config,point) {

		super(config)
		// add a tag to the label
		this.add(new Konva.Tag({
			fill: '#bbb',
			stroke: '#333',
			shadowColor: 'black',
			shadowBlur: 5,
			shadowOffset: [10, 10],
			shadowOpacity: 0.2,
			lineJoin: 'round',
			pointerWidth: 5,
			pointerHeight: 5,
			cornerRadius: 2
		}));
		
		// add text to the label
		this.add(new Konva.Text({
			text: config.en,
			fontSize: 12,
			lineHeight: 1.1,
			padding: 5,
			fill: 'green'
		}));

		this.point = point;

		this.setOffsetX(-5)
		this.setOffsetY(-5)

		this.cache();	

		this.sceneSwitch = false ;
		this.selectSwitch = false;
		this.hoverSwitch = false;	

		this.UpdateLabelVisible();
	}


	UpdateLabelPostion()
	{
		if(! this.isVisible()) return;

		if(this.getParent())
		{
			let isParentFlipX = this.getParent().getParent().IsFlipX();
			let isParentFlipY = this.getParent().getParent().IsFlipY();
			let rotation = this.getParent().getParent().getRotation();

			this.setScaleX(isParentFlipX?-1:1);
			this.setScaleY(isParentFlipY?-1:1);

			rotation = isParentFlipX? rotation:-rotation;
			rotation = isParentFlipY? - rotation:rotation;

			this.setRotation(rotation)
		}

		this.setX(this.point.getX());
		this.setY(this.point.getY());
	}


	SetSceneSwitch(isScene)
	{		
		this.sceneSwitch = isScene ;
		this.UpdateLabelVisible();
	}

	SetSelectSwitch(isSelect)
	{		
		this.selectSwitch = isSelect ;
		this.UpdateLabelVisible();
	}

	SetHoverSwitch(isHover)
	{		
		this.hoverSwitch = isHover ;
		this.UpdateLabelVisible();
	}

	UpdateLabelVisible()
	{		
		let pointVisible = this.point.isVisible();
		let isShow = this.sceneSwitch || this.selectSwitch || this.hoverSwitch;

		this.visible(pointVisible && isShow);

		this.UpdateLabelPostion();
	}
	
	// 静态方法 新建 zhToothPoint
	static Create(config,point) {
		return new zhRegionLabel(config,point);	
    }
}

export default zhRegionLabel;