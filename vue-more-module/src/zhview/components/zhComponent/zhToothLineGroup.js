import zhToothLine from "./zhTooth/zhToothLine" 
import zhLineGroup from "../zhBase/zhLineGroup"

class zhToothGroup extends zhLineGroup{	

	constructor(config) {
		super(config);
		
		this.uniqueId = config.uniqueId ;
	}

	async CreateLineArray(config,toothConfigArray)
	{
		this.lineArray = []

		let toothIndex = 0 ;
		for (const key in toothConfigArray) {

			const toothConfig = toothConfigArray[key];
			toothConfig.uniqueId = this.uniqueId;
			toothConfig.toothIndex = toothIndex ;

			let image = await zhToothLine.CreateFromUrl(toothConfig.url,toothConfig)
			this.lineArray.push(image);

			this.add(image)

			toothIndex++;
		}
	}
	

	// 静态方法 新建 zhToothGroup
	static Create(config = {}) {	
		return   new zhToothGroup(config);	
    }

}

export default zhToothGroup;