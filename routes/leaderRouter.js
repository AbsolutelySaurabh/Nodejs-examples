const express = require('express');

const leaderRouter = express.Router();

leaderRouter.route('/')
.all((req, res, next) => {

	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	next();
})
.get((req, res, next) => {
	res.end('Will provide details of all the leaders to you.');
})
.post((req, res, next) => {

	res.end('Will add the leader: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
	res.statusCode = 403;
	res.end('PUT operation is not supported on /leader');
})
.delete((req, res, next) => {
	res.end('Deleting all the leaders.');
});


//with Id
leaderRouter.route('/:leaderId')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {

	//the next will cause to call it
	res.end('Will send the details of the leader: ' + req.params.leaderId + ' to you!');
})
//CREATE
//the req.body.name came from the jsonPrser.body() method
.post((req, res, next) => {
	res.statusCode = 403;
	res.end('POST operation not supported on /leader/ '+ req.params.leaderId);
})
//UPDATE
.put((req, res, next) => {

	req.write('Updating the leader: ' + req.params.leaderId + '\n');
	res.end('Will update the leader: ' + req.body.name + 'with details: ' + req.body.description);
})
.delete((req, res, next) => {
	//the next will cause to call it
	res.end('Deleting leader: ' + req.params.leaderId);
});

//exporting this router
module.exports = leaderRouter;