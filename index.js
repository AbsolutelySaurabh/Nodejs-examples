const express = require('express');
const http = require('http');

//making use of morgan , helps in seeing the log files
const morgan = require('morgan');
//node router
const bodyParser = require('body-parser');

const dishRouter = require('./routes/dishRouter');
const leaderRouter = require('./routes/leaderRouter');
const promoRouter = require('./routes/promoRouter');

const hostname = 'localhost';
const port = 3000;

//this states that the application uses express
const app = express();
//whenever we need to use MIDDLEWARE, use app.use()
app.use(morgan('dev'));
app.use(bodyParser.json());

//mounting the dshRouter
app.use('/dishes', dishRouter);
app.use('/leader', leaderRouter);
app.use('/promos', promoRouter);

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
