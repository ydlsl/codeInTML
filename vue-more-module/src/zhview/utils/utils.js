class zhUtils {

	
	static LoadImageFromUrl(url)
	{
		return new Promise((resolve, reject) => {
			let img = new Image();

			img.src = url

			img.onload = function() {
				resolve(img)
			}

			img.onerror = (error)=>{
				reject(error);
			}
		})
	}

	static LoadImageFromBase64(base64Image)
	{
		return new Promise((resolve, reject) => {
			let img = new Image();

			img.src = base64Image

			img.onload = function() {
				resolve(img)
			}

			img.onerror = (error)=>{
				reject(error);
			}
		})
	}

	// 随机颜色
	static RandomColor() 
	{
		let color = "#";
		for (var i = 0; i < 6; i++) color += parseInt(Math.random() * 16).toString(16);
		return color;
	}
	
	// 设置锚点坐标
	static  SetAnchorRate(konvaObject,rateX,rateY)
	{
		let pointx = konvaObject.width() * rateX
		let pointy = konvaObject.height() * rateY

		zhUtils.SetAnchorPoint(konvaObject,pointx,pointy)
	}
	
	// 设置锚点坐标
	static  SetAnchorPoint(konvaObject,pointx,pointy)
	{

		let deltax_temp = (pointx - konvaObject.getOffsetX()) * konvaObject.getScaleX();
		let deltay_temp = (pointy - konvaObject.getOffsetY()) * konvaObject.getScaleY();

		let sinA = Math.sin(-konvaObject.getRotation() * Math.sign(konvaObject.getScaleX()) /180*Math.PI)
		let cosA = Math.cos(-konvaObject.getRotation() * Math.sign(konvaObject.getScaleY())/180*Math.PI)
		
		let deltax = deltax_temp * cosA + deltay_temp * sinA
		let deltay = -deltax_temp * sinA + deltay_temp * cosA


		konvaObject.setOffsetX(pointx)
		konvaObject.setOffsetY(pointy)

		zhUtils.SetPosition(konvaObject, konvaObject.getX() + deltax , konvaObject.getY() + deltay)


	}
	
	static SetPosition(konvaObject,PosX,PosY)
	{
		konvaObject.setX(PosX)
		konvaObject.setY(PosY)
	}

	static SetRotation(konvaObject,angle)
	{
		konvaObject.setRotation(angle)
	}

	static SetScale(konvaObject,rate)
	{
		konvaObject.setScaleX(rate);
		konvaObject.setScaleY(rate);
	}
	

}

export default zhUtils