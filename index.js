const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

//the databse conFusion we created earlier via terminal
const url = 'mongodb://localhost:27017/conFusion';

MongoClient.connect(url, (err, db) => {

	//the assert will check that if the "err" is null or not.
	assert.equal(err, null);

	console.log("Connected correctly to the server.");

	//we created dishes collection previously
	const collection = db.collection("dishes");
	//inserting one object in collectiom dishes
	collection.insertOne({"name": "Saurabh Singh", "description": "student"}, (err, result) => {

			//there is nestin of calls

			assert.equal(err, null);

			console.log("After Insert:\n");
			//ops tells how many operations have been succesful
			console.log(result.ops);

			//empty will search for evrthing 
			collection.find({}).toArray((err, docs) => {

				assert.equal(err, null);

				console.log("Found:\n");
				//docs will return all the docs from the collection mathcing find
				//we can apply filter here too.
				console.log(docs);

				//removing collections
				db.dropCollection("dishes", (err, result) => {

					assert.equal(err, null);
					db.close();
				});
			});

		});
});