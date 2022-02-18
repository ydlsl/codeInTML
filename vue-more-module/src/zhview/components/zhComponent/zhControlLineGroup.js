import zhControlLine from "./zhControl/zhControlLine"
import zhLineGroup from "../zhBase/zhLineGroup"

class zhControlLineGroup extends zhLineGroup{
	constructor(config) {
		super(config);		
	}


	CreateLineArray(config,controlLineOder)
	{
		this.lineArray = []
		for (let index = 0; index < controlLineOder.length; index++) {

			let line = zhControlLine.Create(config,{uniqueId:this.uniqueId});
			this.lineArray.push(line)

			this.add(line)
		}
	}


	// 静态方法 新建 zhControlLineGroup
	static Create(config) {
		return new zhControlLineGroup(config);	
    }
}

export default zhControlLineGroup;