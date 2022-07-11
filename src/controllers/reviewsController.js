const reviewModel = require('../models/reviewModel')
const booksModel = require('../models/booksModel');
const mongoose = require('mongoose');

//---------------------------------------------------------addReviewsById-----------------------------------------------------------------------//

const addreviewsById = async function (req, res) {
    try {
        let { reviewedBy, rating, review } = req.body
        console.log(reviewedBy)
        const bookId = req.params.bookId

        if (!mongoose.Types.ObjectId.isValid(bookId)) {
            return res.status(400).send({ status: false, message: "Please enter valid BookId" })
        }

        if (Object.keys(req.body).length == 0) {
            return res.status(400).send({ status: false, message: "Please enter data in the request body" })
        }

        if (!reviewedBy) {
            req.body.reviewedBy = "Guest"
        }
        if (!/^[a-zA-Z_ ]+$/.test(reviewedBy)) {
            return res.status(400).send({ status: false, message: " please Enter valid name of reviewer" });
        }

        if (!rating) {
            return res.status(400).send({ status: false, message: "Please provide Ratings" })
        }
        if (typeof rating !== 'number') {
            return res.status(400).send({ Status: false, message: "rating must be number only" })
        }
        if (rating < 1 || rating > 5) {
            return res.status(400).send({ status: false, message: 'Rating must be in 1 to 5!' })
        }

        const isBook = await booksModel.findById(bookId)
        if (!isBook) {
            return res.status(404).send({ status: false, message: 'Book not found!' })
        }
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
        return res.status(500).send({ status: false, message: err.message })
    }
}

//---------------------------------------------------------updateReview-----------------------------------------------------------------------//

const updateReview = async function (req, res) {
    try {
        let bookId = req.params.bookId
        let reviewId = req.params.reviewId

        if (!mongoose.Types.ObjectId.isValid(bookId)) {
            return res.status(400).send({ status: false, message: "Please enter valid bookId" })
        }
        if (!mongoose.Types.ObjectId.isValid(reviewId)) {
            return res.status(400).send({ status: false, message: "Please enter valid reviewId" })
        }

        const isBook = await booksModel.findById(bookId)

        if (!isBook) {
            return res.status(404).send({ status: false, message: 'Book not found!' })
        }
        if (isBook.isDeleted) {
            return res.status(404).send({ status: false, message: "Book already deleted, can't edit review!" })
        }

        const isReview = await reviewModel.findById(reviewId)
        if (!isReview) {
            return res.status(404).send({ status: false, message: 'Review not found!' })
        }
        if (isReview.bookId.toString() !== bookId) {
            return res.status(404).send({ tatus: false, message: "ReviewId does not belong to particular book !" })
        }
        if (isReview.isDeleted) {
            return res.status(404).send({ status: false, message: "Review already deleted!" })
        }

        let { reviewedBy, rating, review } = req.body

        if (Object.keys(req.body).length == 0) {
            return res.status(400).send({ status: false, message: "Please enter data in the request body to update" })
        }

        if (!/^[a-zA-Z_ ]+$/.test(reviewedBy)) {
            return res.status(400).send({ status: false, message: " please Enter valid name of reviewer" });
        }

        if (typeof rating !== 'number') {
            return res.status(400).send({ Status: false, message: "rating must be number only" })
        }
        if (rating < 1 || rating > 5) {
            return res.status(400).send({ status: false, message: 'Rating must be in 1 to 5!' })
        }

        let updateData = await reviewModel.findOneAndUpdate(
            { isDeleted: false, bookId: bookId, reviewId: reviewId },
            { $set: { reviewedBy: reviewedBy, rating: rating, review: review } },
            { new: true }
        )

        return res.status(200).send({ status: true, message: "reviws are successfully updated", data: updateData })

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

//---------------------------------------------------------deleteReview-----------------------------------------------------------------------//

const deleteReview = async function (req, res) {
    try {
        const bookId = req.params.bookId

        if (!mongoose.Types.ObjectId.isValid(bookId)) {
            return res.status(400).send({ status: false, message: "Please enter valid BookId" })
        }

        const reviewId = req.params.reviewId
        if (!mongoose.Types.ObjectId.isValid(reviewId)) {
            return res.status(400).send({ status: false, message: "Please enter valid reviewId" })
        }

        const isBook = await booksModel.findById(bookId)
        if (!isBook) {
            return res.status(404).send({ status: false, message: 'Book not found!' })
        }
        if (isBook.isDeleted) {
            return res.status(404).send({ status: false, message: "Book already deleted !" })
        }

        const isReview = await reviewModel.findById(reviewId)
        if (!isReview) {
            return res.status(404).send({ status: false, message: 'Review not found!' })
        }
        if (isReview.bookId.toString() !== bookId) {
            return res.status(404).send({ status: false, message: "ReviewId does not belong to particular book !" })
        }
        if (isReview.isDeleted) {
            return res.status(404).send({ status: false, message: "Review already deleted!" })
        }

        isReview.isDeleted = true
        await isReview.save()
        let decrease = isBook.reviews - 1;
        isBook.reviews = decrease
        await isBook.save();

        return res.status(200).send({ status: true, message: "Review deleted successfully and book doc updated!", data: isReview })

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

module.exports = {
    addreviewsById,
    updateReview,
    deleteReview
}