import zhLine from "../../zhBase/zhLine"
import zhUtils from "../../../utils/utils"


class zhControlLine extends zhLine{	 

	constructor(config,info) {
		super(config,info);
	}

	CreateObject(config)
	{
		this.line = new Konva.Line(config)
		this.add(this.line)
	}

	UpDateLine()
	{
		if(this.IsNeedUpdate() == false) return;

		let pointArray = []
		this.points.forEach(point => {
			pointArray.push(point.getX());
			pointArray.push(point.getY());
		});
		
		let buildLine = window.wasm.Build3LineAlpha(pointArray);
		this.line.setPoints(buildLine)	
		
		this.PointsDirtyFinish()
	}


	// 静态方法 zhControlLine
	static Create(config,info) {
		
		if(config.needRandomColor == true)
		{
			let random = zhUtils.RandomColor();
			config.stroke = random +"FF";
			
			if(config.needFill) config.fill = random +"88";
		}
		else
		{	
			if(config.stroke == null){
				config.stroke = '#18ACFF';
			}
		}
			
		if(config.strokeWidth == null)config.strokeWidth = 1;
		
		return  new zhControlLine(config,info);
    }

}

export default zhControlLine;