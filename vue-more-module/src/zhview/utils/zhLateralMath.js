import zhMathEx from "./zhMathEx"


function checkParams(pointArray,count) {
	if(typeof(pointArray) != typeof([])) return false;
	if(pointArray.length < count) return false;

	for (let index = 0; index < pointArray.length; index++) {
		const point = pointArray[index];
		if(typeof(point) != typeof([])) return false;
		if(point.length < 2) return false;
	}

	return true;
}

function getMiddlePoint(point1 , point2) {
	return [(point2[0]+point1[0])/2,(point2[1]+point1[1])/2];
}


function getSlope(point1 , point2) {

	if(point1[0] - point2[0] == 0)
	{
		return null;
	}
	return (point1[1] - point2[1]) / (point1[0] - point2[0]);
}

function getVector(point1 , point2) {
	return [point2[0]-point1[0],point2[1]-point1[1]];
}

function getVectorLength(vector) {
	return Math.sqrt(vector[0]*vector[0] + vector[1]*vector[1])
}

function getVectorDot(vector1 , vector2) {
	return vector1[0]*vector2[0] + vector1[1]*vector2[1];
}

function getVectorAngle(vector1 , vector2) {
	let dotValue =  getVectorDot(vector1 , vector2);

	let length1 = getVectorLength(vector1);
	let length2 = getVectorLength(vector2);

	let cosValue = dotValue/(length1 * length2);

	return (Math.acos(cosValue)/Math.PI * 180) .toFixed(1)
}


export function algorithm_1(pointArray) {
	if(checkParams(pointArray,4))
	{
		let vector1 = getVector(pointArray[0],pointArray[1])
		let vector2 = getVector(pointArray[2],pointArray[3])

		return getVectorAngle(vector1,vector2)
	}		

	return null;
}


export function algorithm_4(pointArray) {
	if(checkParams(pointArray,3))
	{
		// ax+by+c = 0

		let a = 0
		let b = 0
		let c = 0
	  	let k = getSlope(pointArray[1],pointArray[2]);		
		if(k == null)
		{
			a = 1;
			b = 0;
		}
		else
		{
			a = -k;
			b = 1;
		}		
		c = - (a *pointArray[1][0] + b * pointArray[1][1]);


		let dis = (a * pointArray[0][0] + b* pointArray[0][1] + c )/ Math.sqrt(a*a + b*b)
		return Math.abs(dis).toFixed(3)
	}	

	return null;
}


export function algorithm_12(pointArray) {
	if(checkParams(pointArray,6))
	{
		var array = []

		array.push(getMiddlePoint(pointArray[0],pointArray[1]))
		array.push(getMiddlePoint(pointArray[2],pointArray[3]))
		array.push(pointArray[4])
		array.push(pointArray[5])

		return algorithm_1(array)
	}
		
	return null;
}


export class MeasureClass {
	algorithm_1(params) {
		return algorithm_1(params)
	}
	algorithm_4(params) {
		return algorithm_4(params)
	}
	algorithm_12(params) {
		return algorithm_12(params)
	}
}