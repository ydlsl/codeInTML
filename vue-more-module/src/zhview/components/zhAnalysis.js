class zhAnalysis {	

	constructor(config) {
		this.uniqueId = config.uniqueId;

		this.stage = new Konva.Stage(config)
		this.layer = new Konva.Layer()
		this.stage.add(this.layer)

		this.angle = 0;

		this.scale = 1;
	}

	//test
	AddTestLayer()
	{
		
		var rect = new Konva.Rect({
			width: 10000,
			height: 10000,
			fill: 'red'
		});


		var rect1 = new Konva.Rect({
			width: 30,
			height: 30,
			fill: 'green'
		});

		var rect2 = new Konva.Rect({
			x:30,
			width: 30,
			height: 30,
			fill: 'blue'
		});

		var rect3 = new Konva.Rect({
			x:60,
			width: 30,
			height: 30,
			fill: 'green'
		});

		var rect4 = new Konva.Rect({
			x:90,
			width: 30,
			height: 30,
			fill: 'blue'
		});

		rect.on("mousedown", function() {
			console.log("dasdsadsadsadasd")
		});

		rect1.on("mousedown", () => {
			//console.log("撤销")

			this.group.UndoOperate();

			//this.scale += 0.1;
			//this.group.setScale(this.scale);
		});

		rect2.on("mousedown", () => {
			//console.log("恢复")
			
			this.group.RedoOperate();

			//this.scale -= 0.1;
			//this.group.setScale(this.scale);
		});

		rect3.on("mousedown", () => {
			console.log("旋转")
			this.angle += 20;
			this.group.RotateAngle(this.angle);

			//this.group.GetAllPoints();
		});


		rect4.on("mousedown", () => {
			//console.log("旋转")

			//this.group.SetFlipX(true);
			//this.group.SetFlipY(true);


			this.group.SetVersioData();
		});
		

		this.layer.add(rect)
		this.layer.add(rect1)
		this.layer.add(rect2)
		this.layer.add(rect3)
		this.layer.add(rect4)
	}

	//把对象放在组内 本项目layer只能有一个并且只能add一个总的group
	AddChild(konvaObject)
	{
		if(this.layer.hasChildren() == true) this.layer.destroyChildren();

		//this.AddTestLayer();
			
		this.group = konvaObject;

		this.group.setX(this.stage.width()/2) 
		this.group.setY(this.stage.height()/2) 

		this.layer.add(this.group)
	}


	destory()
	{
		this.stage.destroy();
	}


	// 静态方法 新建stage zhAnalysis
	static Create(config = {}) {		
		return new zhAnalysis(config);
    }

}

export default zhAnalysis;