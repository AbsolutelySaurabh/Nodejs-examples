const http = require('http');

//fs is filesyatem, allows reading and writing files
const fs = require('fs');
//path helps to specify path
const path = require('path');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {

	console.log("Request for " + req.url + ' by method ' + req.method);
	if(req.method == 'GET'){

		var fileUrl;
		if(req.url == '/'){
			fileUrl = '/index.html';
		}else{
			fileUrl = req.url;
		}

		var filePath = path.resolve('./public' + fileUrl);

		//not we have to make sure that the file name extension is .html
		const fileExt = path.extname(filePath);
		if(fileExt == '.html'){
			fs.exists(filePath, (exists) => {

				if(!exists){
					res.statusCode = 404;
					res.setHeader('Content-Type', 'text/html');
					res.end('<html><body><h1>Error 404: ' + fileUrl + 'not found</h1></body></html>');

					return;
				}else{

					res.statusCode = 200;
					res.setHeader('Content-Type', 'text/html');

					//need to read the file and send it
					fs.createReadStream(filePath).pipe(res);
				}
			})
		}else{

			//if file extension is not html;
		   res.statusCode = 404;
		   res.setHeader('Content-Type', 'text/html');		
		   res.end('<html><body><h1>Error 404: ' + fileUrl + 'Its not an html file.</h1></body></html>');
		   return;
		}

	}else{

	       //if file extension is not html;
		   res.statusCode = 404;
		   res.setHeader('Content-Type', 'text/html');		
		   res.end('<html><body><h1>Error 404: ' + req.method + ' is not supported.</h1></body></html>');
		   return;
	}

}) 

//start server
server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}`);
});