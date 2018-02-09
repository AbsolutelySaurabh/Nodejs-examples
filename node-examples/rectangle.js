// exports.perimeter = (x, y) => (2*(x+y));
// exports.area = (x, y) => (x*y);

module.exports = (x, y, callback) => {
	if(x <= 0 || y <= 0){

		setTimeout(() => 
			callback(new Error("Rectangle dimensions should be greater than zero.")

				, null), 2000);
		//created a delay of 2 sec.
	}else{

		setTimeout(() => callback(null, {
			//here the first parameter which is error is null
			//here is the object as 2nd par
			perimeter: () => (2*(x+y)),
			area: () => (x*y)
		}),
		2000);
	}
}