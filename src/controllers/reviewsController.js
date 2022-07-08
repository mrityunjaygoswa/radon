const reviewModel = require('../models/reviewModel')
const booksModel = require('../models/booksModel');
const mongoose = require('mongoose')

const addreviewsById = async function (req, res) {


    try {

        let { reviewedBy, rating, review } = req.body
        const bookId = req.params.bookId
        // if(!bookId){
        //     return res.status(400).send({ status: false, msg: "Please enter BookId" }) 
        // }
        
        if (!mongoose.Types.ObjectId.isValid(bookId)) {
            return res.status(400).send({ status: false, msg: "Please enter valid BookId" })
        }
        
        
        if (Object.keys(req.body).length == 0) {
            return res.status(400).send({ status: false, msg: "Please enter data in the request body" })
        }

        if (!reviewedBy) {
            return res.status(400).send({ status: false, msg: " Please Enter Reviewer name" })
        }

        if (!/^[a-zA-Z_ ]+$/.test(reviewedBy)) {
            return res.status(400).send({ status: false, msg: " please Enter valid name of reviewer" });
        }

        if (!rating) {
            return res.status(400).send({ status: false, msg: "Please provide Ratings" })
        }
        if (typeof rating !== 'number') {
            return res.status(400).send({ Status: false, message: "rating must be number only" })
        }
        if (rating < 1 || rating > 5) {
            return res.status(400).send({ status: false, message: 'Rating must be in 1 to 5!' })
        }

        console.log('1')
        const isBook = await booksModel.findById(bookId)
        if (!isBook) {
            return res.status(404).send({ status: false, message: 'Book not found!' })
        }
        console.log('2')
        if (isBook.isDeleted) {
            return res.status(404).send({ status: false, message: "Book already deleted, can't add review!" })
        }

        let tempObj = { reviewedBy, rating, review, bookId, reviewedAt: new Date() }

        const reviewData = await reviewModel.create(tempObj)

        if (reviewData) {
            let inc = isBook.reviews + 1;
            isBook.reviews = inc
            await isBook.save();
        }

        return res.status(201).send({ status: true, message: "thank you for reviewing", data: reviewData })

    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

module.exports = {
    addreviewsById
}