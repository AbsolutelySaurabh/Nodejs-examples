//mongoose provides us a structured way of organising schemas for our mongodb db.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//mongoose-currelcy is used to use the "currency" types in the file
//Since the price of the dishes will require currency
require('mongoose-currency').loadType(mongoose);
const Currency  = mongoose.Types.Currency;


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

	image: {
		type: String,
		required: true
	},

	label: {
		type: String,
		default: ''
	},

	price: {
		//using mongoose-currency module, see top
		type: Currency,
		required: true,
		min: 0
	},

	featured: {
		type: Boolean,
		default: false
	},

	comments: [commentSchema]
	
},{
	//this will automaticalle create upDated at:, and createdAt timestamps
	//this was provided by mongoose only.
	timestamps: true

});

var Dishes = mongoose.model('Dish', dishSchema);
module.exports = Dishes;