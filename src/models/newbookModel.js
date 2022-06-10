const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const bookSchema = new mongoose.Schema( {
    book_name: String,
    author_id: {
        type: ObjectId,
        ref: "newAuthor"
    },
    price: Number,
    ratings: Number,
    newPublisher_id : {
        type : ObjectId,
        ref : "newPublisher"
    }


}, { timestamps: true });


module.exports = mongoose.model('Book', bookSchema)
