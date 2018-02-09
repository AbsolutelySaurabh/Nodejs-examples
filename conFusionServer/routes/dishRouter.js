const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const dishRouter = express.Router();
dishRouter.use(bodyParser.json());

//going 2 level up to find the file
const Dishes = require('../models/dishes');


//we'll mount this furtherin index.js on /dishes
dishRouter.route('/')
.get((req,res,next) => {

    //find all the dishes first, will return all the dishes
    Dishes.find({})
    //the above is going to return a promise/dish, so handle it usign below
    .then((dish) => {

        res.StatusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);

    }, (err) => next(err))
    .catch(err => next(err));

    //whenever error will ocuur, using the code bove it'll pass the error
    //to the overall error handler of the application

})
.post((req, res, next) => {

    Dishes.create(req.body)
    //the above will return a dish
    .then((dish) => {

        console.log('Dish created ', dish);
        res.StatusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch(err => next(err));

})

.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
})

.delete((req, res, next) => {

    //removing all the dishes form the server
    Dishes.remove({})
    .then((resp) => {
        res.StatusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch(err => next(err));

});



// const dishRouter_id = express.Router();
// //for disheId
dishRouter.route('/:dishId')
.get((req, res, next) => {

    Dishes.findById(req.params.dishId)
    .then((resp) => {
        res.StatusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch(err => next(err));
})

//CREATE
//the req.body.name came from the jsonPrser.body() method
.post((req, res, next) => {
	res.statusCode = 403;
	res.end('POST operation not supported on /dishes/ '+ req.params.dishId);
})

//UPDATE
.put((req, res, next) => {

    Dishes.findById(req.params.dishId, {

        $set: req.body

    }, { 
        //sending an additional reply to the user
        new: true
    })
    .then((resp) => {
        res.StatusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch(err => next(err));

})
.delete((req, res, next) => {

    Dishes.findByIdAndRemove(req.params.dishId)
     .then((resp) => {
        res.StatusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch(err => next(err));

});

//exporting this router
module.exports = dishRouter;