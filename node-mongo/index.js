const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');

//the databse conFusion we created earlier via terminal
const url = 'mongodb://localhost:27017/conFusion';

MongoClient.connect(url).then( db => {

	console.log("Connected correctly to the server.");

	dboper.insertDocument(db, {name: "saurabh singh", description: "student"},
	 "dishes").then( result => {

		console.log("Insert doc: \n ", result.ops);

		return dboper.findDocuments(db, "dishes");

		})

		.then(docs => {

			console.log("Found Docs: \n", docs);

			return dboper.updateDocument(db, {name: "saurabh singh"},
			 { description: "test student"},"dishes");

		})

		.then(result => {

				console.log("Updated document: \n ",result.result );

				return dboper.findDocuments(db, "dishes");

		})

		.then( docs => {

            console.log("Found Updated Documents:\n", docs);

			return db.dropCollection("dishes");

		})

		.then(result => {

				console.log("Dropped colletions: ", result);

				return db.close();

		})
		
		.catch(err => console.log(err));

})
.catch(err => console.log(err));
