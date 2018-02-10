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

    Dishes.findByIdAndUpdate(req.params.dishId, {

        $set: req.body

    }, { 
        //sending an additional reply to the user
        new: true
    })
    .then((dish) => {
        res.StatusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
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




// const dishRouter_id = express.Router();
// //for disheId/comments
dishRouter.route('/:dishId/comments')
.get((req, res, next) => {

    Dishes.findById(req.params.dishId)
    // the above will return a dish
    .then((dish) => {
        
        if(dish!=null){
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish.comments);
        }else{

            err = new Error('Dish ' + req.params.dishId + ' not found.');
            err.status = 404;
            //here we are using the ERROR HANDLER of the app.js file.
            return next(err);
        }
    }, (err) => next(err))
    .catch(err => next(err));
})

//CREATE
//posting a comment
.post((req, res, next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if (dish != null) {
            dish.comments.push(req.body);
            dish.save()
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);                
            }, (err) => next(err));
        }
        else {
            err = new Error('Dish ' + req.params.dishId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})

//UPDATE
//updating a comment
.put((req, res, next) => {

    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes/' + req.params.dishId
            + '/comments');

})

.delete((req, res, next) => {
    Dishes.findById(req.params.dishId)
     .then((dish) => {

        if(dish!=null){

            for(var i = (dish.comments.length -1 ); i>=0;i--){
                dish.comments.id(dish.comments[i]._id).remove();
            }
            dish.save()
            .then(dish => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);  
            }, err => next(err));
        }else{

            err = new Error('Dish ' + req.params.dishId + ' not found');
            err.status = 404;
            return next(err);   
        }
    }, (err) => next(err))
    .catch(err => next(err));

});


//now go for individual comments wihth comment ID
dishRouter.route('/:dishId/comments/:commentId')
.get((req,res,next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if (dish != null && dish.comments.id(req.params.commentId) != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish.comments.id(req.params.commentId));
        }
        else if (dish == null) {
            err = new Error('Dish ' + req.params.dishId + ' not found');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Comment ' + req.params.commentId + ' not found');
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes/'+ req.params.dishId
        + '/comments/' + req.params.commentId);
})
.put((req, res, next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if (dish != null && dish.comments.id(req.params.commentId) != null) {
            if (req.body.rating) {
                dish.comments.id(req.params.commentId).rating = req.body.rating;
            }
            if (req.body.comment) {
                dish.comments.id(req.params.commentId).comment = req.body.comment;                
            }
            dish.save()
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);                
            }, (err) => next(err));
        }
        else if (dish == null) {
            err = new Error('Dish ' + req.params.dishId + ' not found');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Comment ' + req.params.commentId + ' not found');
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if (dish != null && dish.comments.id(req.params.commentId) != null) {
            dish.comments.id(req.params.commentId).remove();
            dish.save()
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);                
            }, (err) => next(err));
        }
        else if (dish == null) {
            err = new Error('Dish ' + req.params.dishId + ' not found');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Comment ' + req.params.commentId + ' not found');
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});


//exporting this router
module.exports = dishRouter;