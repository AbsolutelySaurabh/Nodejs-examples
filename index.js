const express = require('express');
const http = require('http');

const hostname = 'localhost';
const port = 3000;

//this states that the applicai
const app = express();

//the next is used when we need to invoke additional middleware, will learn further
app.use((req, res, next) => {

	console.log(req.headers);
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/html');
	res.end('<html><body><h1>This is an express server</h1></body></html>');

});

//set up 
const server = http.createServer(app);

server.listen(port, hostname, () => {

	console.log(`Server runnign at http://${hostname}:${port}`);


});
