const assert = require('assert');


exports.insertDocument = (db, document, collection, callback) => {

	const coll = db.collection(collection);
	return coll.insert(document);

};

exports.findDocuments = (db, collection, callback) => {
	const coll = db.collection(collection);

	//mathcing will all the documents, so empty object as par
	return coll.find({}).toArray();

};

exports.removeDocument = (db, document, collection, callback) => {
	const coll = db.collection(collection);
	return coll.deleteOne(document);

};

exports.updateDocument = (db, document, update, collection, callback) => {

	const coll = db.collection(collection);
	return coll.updateOne(document, {set: update }, null);

};