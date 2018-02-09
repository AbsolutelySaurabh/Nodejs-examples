const mongoose = require('mongoose');
//bluebird is a 3rd party promise module of nodejs
mongoose.Promise = require('bluebird');

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url, {

	//this will encourage Mongo to use the MOngoDB driver to connect
	useMongoClient: true
});

connect.then((db) => {

	//when connection is istablished
	console.log('Connected to server correctly');

	var newDish = Dishes({

		name: 'Daal',
		description: 'text'
	});

	newDish.save().then((dish) => {

		console.log(dish);

		return Dishes.find({}).exec();
	})
	.then((dishes) => {
		//when I get the dishes
		console.log(dishes);

		return db.collection('dishes').drop();

	})
	.then(() => {
		return db.close();
	})

	//catch any error
	.catch((err) => {

		console.log(err);
	});

});