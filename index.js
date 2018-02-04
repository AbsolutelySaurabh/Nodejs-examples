//here we have imported the node module
var rect = require('./rectangle');

function solveRect(l, b){
	console.log("Solving for rectangle with l = " + l +" and b = " + b);
	
	rect(l, b, (err, rectangle) => {

		if(err){
			console.log("ERROR: ", err.message);
		}else{
			
			console.log("The area of the rectangle of dimensions l = "
				+ l + " and b = " + b + " is: " + rectangle.area());
			//in the abobe we do not need to give parameters is area() as it'll auto take from above method via callback
			//in javascript due to callback the inner methos has accesss to all the variables of the outer method.

			console.log("The perimeter of the rectangle of dimensions l = "
				+ l + " and b = " + b + " is: " + rectangle.perimeter());
			
		}
	});

	console.log("This statement is after the call to rect().");

}

solveRect(2, 3);
solveRect(4, 5);
