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

	Dishes.create({

		name: 'Mozeralla',
		description: 'text'
	})

	.then((dish) => {

		console.log(dish);

		return Dishes.findByIdAndUpdate(dish._id, {

			$set: { description: 'Updated dish'}
		},{
			//once upadets it'll return in next step
			new: true
		})
		.exec();
	})
	//aftre the above methos this will get executed
	//the above will return a dish
	.then((dish) => {
		//when I get the dishes
		console.log(dish);

		//inserta comment
		dish.comments.push({

			rating: 5,
			comment: 'enjoyed the dish.',
			author: "Rahul Khandelwal"
		});

		return dish.save();
	})
	//aftre the above methos this will get executed
	//the above will return a dish
	.then(dish => {

		console.log(dish);
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