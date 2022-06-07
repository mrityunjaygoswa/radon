const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema( {
    bookName: {type :String,
        require:true } , 
    
    tags: [String],
    authorName : String,
    totalPages:Number,
    stockAvailable :Boolean,
    year:{
        type : Number,
    default :2021},
    
    
    price: {
        indianPrice: String,
        europePrice: String,
    },

}, { timestamps: true });


module.exports = mongoose.model('Book', bookSchema) //users

//Validation:
//require:true
//unique
// default

//String
//Number
//Date
//Boolean
// Arrays
// Object
// ObjectId
// Buffer - not cover
