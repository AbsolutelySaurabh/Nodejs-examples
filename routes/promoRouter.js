const express = require('express');

const promoRouter = express.Router();

promoRouter.route('/')
.all((req, res, next) => {

	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	next();
})
.get((req, res, next) => {
	res.end('Will provide details of all the promos to you.');
})
.post((req, res, next) => {

	res.end('Will add the promos: ' + req.body.name + ' with details: ' + req.body.description);
})
//UPDATE
.put((req, res, next) => {
	res.statusCode = 403;
	res.end('PUT operation is not supported on /promo');
})
.delete((req, res, next) => {
	res.end('Deleting all the promos.');
});


//with Id
promoRouter.route('/:promoId')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {

	//the next will cause to call it
	res.end('Will send the details of the promo: ' + req.params.promoId + ' to you!');
})
//CREATE
//the req.body.name came from the jsonPrser.body() method
.post((req, res, next) => {
	res.statusCode = 403;
	res.end('POST operation not supported on /promo/ '+ req.params.promoId);
})
//UPDATE
.put((req, res, next) => {

	req.write('Updating the promo: ' + req.params.promoId + '\n');
	res.end('Will update the promo: ' + req.body.name + 'with details: ' + req.body.description);
})
.delete((req, res, next) => {
	//the next will cause to call it
	res.end('Deleting promo: ' + req.params.promoId);
});

//exporting this router
module.exports = promoRouter;