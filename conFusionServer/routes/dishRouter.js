const express = require('express');

const dishRouter = express.Router();


//we'll mount this furtherin index.js on /dishes
dishRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send all the dishes to you!');
})
.post((req, res, next) => {
    res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
})
.delete((req, res, next) => {
    res.end('Deleting all dishes');
});


// const dishRouter_id = express.Router();
// //for disheId
dishRouter.route('/:dishId')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {

	//the next will cause to call it
	res.end('Will send the details of the dish: ' + req.params.dishId + ' to you!');
})
//CREATE
//the req.body.name came from the jsonPrser.body() method
.post((req, res, next) => {
	res.statusCode = 403;
	res.end('POST operation not supported on /dishes/ '+ req.params.dishId);
})
//UPDATE
.put((req, res, next) => {

	req.write('Updating the dish: ' + req.params.dishId + '\n');
	res.end('Will update the dish: ' + req.body.name + 'with details: ' + req.body.description);
})
.delete((req, res, next) => {
	//the next will cause to call it
	res.end('Deleting dish: ' + req.params.dishId);
});

//exporting this router
module.exports = dishRouter;