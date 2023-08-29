const express = require('express')
const Book = require('../model/Book')


const app = express()

const bookRoute = express.Router()

///Add book
bookRoute.route('/add-book').post((req, res, next)=>{
    Book.create(req.body)
    .then((data) => {
        res.json(data);
    }).catch((error)=>{
        return next(error);
    })
    // Book.create(req.body,(error,data)=>{
    //     if(error){
    //         return next(error)
    //     }else{
    //         res.json(data)
    //     }
    // })
})


// Get all book
bookRoute.route('/').get((req, res,next) => {
    Book.find()
    .then((data) => {
        res.json(data);
    }).catch((error)=>{
        return next(error);
    })
    // Book.find((error, data) => {
    //     if (error) {
    //         // return next(error);
    //         res.send(error);
    //     } else {
    //         res.json(data);
    //     }
    // })
})


///Get book by id
bookRoute.route('/read-book/:id').get((req, res, next)=>{
    Book.findById(req.params.id).then((data)=>{
        res.json(data)
    }).catch((error)=>{
        return next(error)
    })
})

/// Update book
bookRoute.route('/update-book/:id').put((req, res, next)=>{
    Book.findByIdAndUpdate(req.params.id,{$set:req.body}).then((data)=>{
        console.log('update Success');
        res.json(data)
    }).catch((error)=>{
        console.log(error);
        return next(error)
    })
})

///delete book
bookRoute.route('/delete-book/:id').delete((req, res, next)=>{
    Book.findByIdAndDelete(req.params.id).then((data)=>{
        res.status(200).json({
            msg:data
        })
    }).catch((error)=>{
        return next(error)
    })
    // Book.findById(req.params.id,(error,data)=>{
    //     if(error){
    //         return next(error)
    //     }else{
    //         res.status(200).json({
    //             msg:data
    //         })
    //     }
    // })
})

module.exports = bookRoute