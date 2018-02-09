//mongoose provides us a structured way of organising schemas for our mongodb db.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const commentSchema = new Schema({

	rating: {
		type: String,
		min:1,
		max: 5,
		required: true
	},

	comment: {
		type: String,
		required: true
	},

	author: {

		type: String,
		required: true
	}

}, {
	timestamps: true
});


const dishSchema = new Schema({

	name: {
		type: String,
		required: true,
		//unique means no two docs will have the same name
		unique: true
	},

	description: {

		type: String,
		required: true
	},

	comments: [commentSchema]
	
},{
	//this will automaticalle create upDated at:, and createdAt timestamps
	//this was provided by mongoose only.
	timestamps: true

});

var Dishes = mongoose.model('Dish', dishSchema);
module.exports = Dishes;