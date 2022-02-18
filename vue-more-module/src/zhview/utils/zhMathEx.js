class zhMathEx {

	static GetPointsVector(point1,ponit2)
	{
		return {x:(point1.x-ponit2.x),y:(point1.y-ponit2.y)};
	}

	static GetPointsMid(point1,ponit2)
	{
		return{x:(point1.x+ponit2.x)/2,y:(point1.y+ponit2.y)/2};
	}

	static GetVectorLength(vector)
	{
		return Math.sqrt(vector.x*vector.x+vector.y*vector.y);
	}


	static GetAngleBetweenVector(vector1,vector2)
	{
		let o = Math.atan2(vector1.y,vector1.x) - Math.atan2(vector2.y,vector2.x)
		
		return o*180 /Math.PI;
	}

}

export default zhMathEx