import zhControlPoint from "./zhControl/zhControlPoint"
import zhPointGroup from "../zhBase/zhPointGroup"

class zhControlPointGroup extends zhPointGroup{
	constructor(config,pointArray) {
		super(config,pointArray);
	}

	CreatePoint(config)
	{
		this.AddPoint(zhControlPoint.Create(config))
	}

	SetOderArray(controlLineOder)
	{
		this.controlLineOder = controlLineOder
	}

	GetPointsByIndex(lineIndex)
	{
		let array = []
		const pointLine = this.controlLineOder[lineIndex];
		for (let index = 0; index < pointLine.length; index++) {
			const pointIndex = pointLine[index];
			array.push(this.points[pointIndex]);
		}
		return array
	}
	SetSelectPointIndex(selectIndex)
	{
		if(this.selectPointIndex>0) {
			let point = this.GetPointByPointIndex(this.selectPointIndex)
			point.setAttrs({'stroke':'#F5D32F', 'fill':'#FFFFFF'})
			if(selectIndex==0)
			this.selectPointIndex = 0
		}
		if(selectIndex>0) {
			let point = this.GetPointByPointIndex(selectIndex)
			if (point.IsKey())
			point.setAttrs({'stroke':'#E1277D', 'fill':'#E4BFD0'})
			this.selectPointIndex = selectIndex
		}

	}
	// 静态方法 新建 zhControlPointGroup
	static Create(config,pointArray) {
		return new zhControlPointGroup(config,pointArray);	
    }
}

export default zhControlPointGroup;