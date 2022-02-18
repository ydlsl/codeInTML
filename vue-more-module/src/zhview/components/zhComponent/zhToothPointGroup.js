import zhToothPoint from "./zhTooth/zhToothPoint" 
import zhPointGroup from "../zhBase/zhPointGroup"

class zhToothPointGroup extends zhPointGroup{	

	constructor(config,pointArray) {
		super(config,pointArray);	
	}

	CreatePoint(config)
	{
		this.AddPoint(zhToothPoint.Create(config))
	}

	GetPointsByIndex(toothIndex)
	{
		let array = []
		for (const key in this.points) {
			if (Object.hasOwnProperty.call(this.points, key)) {
				if(this.points[key].info.toothIndex == toothIndex)
				{
					array.push(this.points[key]);
				}				
			}
		}
		return array
	}

	// 静态方法 新建 zhToothPointGroup
	static Create(config , pointArray) {	
		return   new zhToothPointGroup(config,pointArray);	
    }

}

export default zhToothPointGroup;