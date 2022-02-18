import zhControlPoint from "./zhControl/zhControlPoint" 
import zhPointGroup from "../zhBase/zhPointGroup"

class zhUnusePointGroup extends zhPointGroup{	

	constructor(config,pointArray) {
		super(config,pointArray);
	}

	CreatePoint(config)
	{
		this.AddPoint(zhControlPoint.Create(config))
	}

	// 静态方法 新建 zhUnusePointGroup
	static Create(config ,pointArray) {	
		return  new zhUnusePointGroup(config,pointArray);	
    }

}

export default zhUnusePointGroup;