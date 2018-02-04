const express = require('express');
const http = require('http');

//making use of morgan , helps in seeing the log files
const morgan = require('morgan');
//node router
const bodyParser = require('body-parser');

const hostname = 'localhost';
const port = 3000;

//this states that the application uses express
const app = express();
//whenever we need to use MIDDLEWARE, use app.use()
app.use(morgan('dev'));
app.use(bodyParser.json());

app.all('/dishes', (req,res, next) => {

	//for all the requests, nomatter get, put, post
	//this code will get executed by default
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	//this the next parameter callback
	next();

});

//first the abpve will run then get will run
//the req, res, next will the one above in all
app.get('/dishes', (req, res, next) => {

	//the next will cause to call it
	res.end('Will send all the dishes to you!.');

});

//UPDATE
//the req.body.name came from the jsonPrser.body() method
app.post('/dishes', (req, res, next) => {
	//the next will cause to call it
	res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
});

//CREATE
app.put('/dishes', (req, res, next) => {
	//the next will cause to call it
	res.statusCode = 403;
	res.end('PUT operation not supported on /dishes');

});

//dangerous DELETE
app.delete('/dishes', (req, res, next) => {
	//the next will cause to call it
	res.end('Deleting all the dishes!');
});





app.get('/dishes/:dishId', (req, res, next) => {

	//the next will cause to call it
	res.end('Will send the details of the dish: ' + req.params.dishId + ' to you!');

});

//CREATE
//the req.body.name came from the jsonPrser.body() method
app.post('/dishes/:dishId', (req, res, next) => {
	//the next will cause to call it
	res.statusCode = 403;
	res.end('POST operation not supported on /dishes/ '+ req.params.dishId);
});

//UPDATE
app.put('/dishes/:dishId', (req, res, next) => {

	req.write('Updating the dish: ' + req.params.dishId + '\n');
	res.end('Will update the dish: ' + req.body.name + 'with details: ' + req.body.description);

});

//dangerous DELETE
app.delete('/dishes/:dishId', (req, res, next) => {
	//the next will cause to call it
	res.end('Deleting dish: ' + req.params.dishId);
});




//setting up the server to sunup the html files
//after installing morgan
//__dirname says the morgan to lookup public in root project folder
//using morgan we can directly MAKE USE OF THE HTML FILES DECLARED IN PUBLIC FOLDER.
app.use(express.static(__dirname + '/public'));

//the next is used when we need to invoke additional middleware, will learn further
app.use((req, res, next) => {

	console.log(req.headers);
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/html');
	res.end('<html><body><h1>This is an express server.</h1></body></html>');

});

//set up 
const server = http.createServer(app);

server.listen(port, hostname, () => {

	console.log(`Server runnign at http://${hostname}:${port}`);


});
