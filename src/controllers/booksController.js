const userController = require('../controllers/userController');
const booksModel = require('../models/booksModel');
const reviewModel = require('../models/reviewModel')
const mongoose = require('mongoose')
const moment = require('moment')

let { cutSpace } = userController

//---------------------------------------------------------createBooks-----------------------------------------------------------------------//

const createBooks = async function (req, res) {

    try {
        let { title, excerpt, userId, ISBN, category, subcategory, releasedAt } = req.body;


        if (Object.keys(req.body).length == 0) {
            return res.status(400).send({ status: false, message: "Please request data to be created" })
        }
        let uniqueCheck = await booksModel.findOne({ $or: [{ title: title }, { ISBN: ISBN }] })
        if (uniqueCheck) {
            return res.status(400).send({ status: false, message: "title/ISBN already exists" })
        }

        if (!title) {
            return res.status(400).send({ status: false, message: "Please enter title" })
        }

        if (!excerpt) {
            return res.status(400).send({ status: false, message: "Please enter excerpt" })
        }
        if (excerpt.length < 6) {
            return res.status(400).send({ status: false, message: "excerpt length should be more than 4 characters" })
        }

        if (!userId) {
            return res.status(400).send({ status: false, message: "Please enter userId" })
        }
        if (userId.length !== 24) {
            return res.status(400).send({ status: false, message: "Please enter proper length of user Id (24)" })
        }
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).send({ status: false, message: "Please enter valid userId" })
        }

        if (!ISBN) {
            return res.status(400).send({ status: false, message: "Please enter ISBN" })
        }
        if (!/^[0-9]*[-| ][0-9]*[-| ][0-9]*[-| ][0-9]*[-| ][0-9]*$/.test(ISBN)) {
            return res.status(400).send({ status: false, message: "Please enter  valid ISBN" })
        }

        if (!category) {
            return res.status(400).send({ status: false, message: "Please enter category" })
        }

        if (!subcategory) {
            return res.status(400).send({ status: false, message: "Please enter subcategory" })
        }

        if (!releasedAt) {
            return res.status(400).send({ status: false, message: "Please enter releasing time" })
        }

        // var formated_date = moment(releasedAt).format('YYYY-MM-DD');
        // console.log(formated_date)

        let titleName = cutSpace(title)
        req.body.title = titleName

        let excerptBody = cutSpace(excerpt)
        req.body.excerpt = excerptBody

        let createdBooks = await booksModel.create(req.body)
        // if(!formated_date){
        //     await formated_date.save()

        // }
        return res.status(201).send({ status: true, message: "Your book has been created successfully", data: createdBooks })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

//-----------------------------------------------------------getBooks-----------------------------------------------------------------------//

const getBooks = async function (req, res) {
    try {
        let { userId, category, subcategory } = req.query

        if (Object.keys(req.query).length == 0) {
            return res.status(400).send({ status: false, message: "Please put query to get books" })
        }

        if (!userId) {
            return res.status(400).send({ status: false, message: "Please enter userId" })
        }
        if (userId.length !== 24) {
            return res.status(400).send({ status: false, message: "Please enter proper length of user Id (24)" })
        }
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).send({ status: false, message: "Please enter valid userId" })
        }

        let books = await booksModel.find(
            { isDeleted: false },
            { $or: [{ userId: userId }, { category: category }, { subcategory: subcategory }] }
        )
            .sort({ userId: 1, category: 1, subcategory: 1 })
            .select({
                _id: 1, title: 1, excerpt: 1, userId: 1, category: 1, reviews: 1, releasedAt: 1
            })
        if (!books[0]) {
            return res.status(404).send({ status: false, message: "no such books found" })
        }

        return res.status(200).send({ status: true, message: "here all books are, related to your search", data: books })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

//---------------------------------------------------------getBooksById-----------------------------------------------------------------------//

const getBooksById = async (req, res) => {
    try {
        const bookId = req.params.bookId
        //    console.log('1')
        //     if (!bookId) {
        //         return res.status(400).send({ status: false, message: " bookid is missing" })
        //     }
        //     console.log('2')
        if (!mongoose.Types.ObjectId.isValid(bookId)) {
            return res.status(400).send({ status: false, message: "Please enter valid userId" })
        }

        const data = await booksModel.findOne({ _id: bookId })

        if (!data) {
            return res.status(404).send({ status: false, message: "no books exist" })
        }

        if (data.isDeleted) {
            return res.status(404).send({ status: false, message: "Book is already deleted" })
        }


        let { _id, title, excerpt, userId, category, subcategory, isDeleted, reviews, deletedAt, releasedAt, createdAt, updatedAt } = data

        const reviewsData = await reviewModel.find({ isDeleted: false, bookId: _id }).select({ _id: 1, bookId: 1, reviewedBy: 1, reviewedAt: 1, rating: 1, review: 1 })

        let list = { _id, title, excerpt, userId, category, subcategory, isDeleted, reviews, deletedAt, releasedAt, createdAt, updatedAt, reviewsData }

        return res.status(200).send({ status: true, message: "Book List", data: list })
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

//--------------------------------------------------------updateBooksById-----------------------------------------------------------------------//

const updateBooksById = async function (req, res) {
    try {
        let { title, excerpt, releasedAt, ISBN } = req.body
        let bookId = req.params.bookId

        if (Object.keys(req.body).length == 0) {
            return res.status(400).send({ status: false, message: "Please enter the data in the request body" })
        }

        if (!mongoose.Types.ObjectId.isValid(bookId)) {
            return res.status(400).send({ status: false, message: "Please enter valid bookId" })
        }

        if (excerpt.length < 6) {
            return res.status(400).send({ status: false, message: "excerpt length should be more than 6 characters" })
        }

        if (!/^[0-9]*[-| ][0-9]*[-| ][0-9]*[-| ][0-9]*[-| ][0-9]*$/.test(ISBN)) {
            return res.status(400).send({ status: false, message: "Please enter  valid ISBN" })
        }

        let bookPresent = await booksModel.findById(bookId)
        if (!bookPresent) {
            return res.status(404).send({ status: false, message: "There is no book with this Id" })
        }

        let uniqueCheck = await booksModel.findOne({ $or: [{ title: title }, { ISBN: ISBN }] })
        if (uniqueCheck) {
            return res.status(400).send({ status: false, message: "title/ISBN already exists" })
        }

        if (!moment(releasedAt).format('YYYY-MM-DD')) {
            return res.status(400).send({ status: false, message: "please enter date format like this: YYYY-MM-DD" })
        }

        let updatedData = await booksModel.findOneAndUpdate(
            { _id: bookId, isDeleted: false },
            {
                title: title,
                excerpt: excerpt,
                releasedAt: releasedAt,
                ISBN: ISBN,
            },
            { new: true }
        )

        return res.status(200).send({ status: true, message: "Data updated successfully", data: updatedData })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

//---------------------------------------------------------deleteBooksById-----------------------------------------------------------------------//

const deleteBooksById = async function (req, res) {
    try {
        let bookId = req.params.bookId;

        if (!mongoose.Types.ObjectId.isValid(bookId)) {
            return res.status(400).send({ status: false, message: "Please enter valid bookId" })
        }

        let book = await booksModel.findById(bookId)
        if (!book) {
            return res.status(404).send({ status: false, message: 'no such book exists' });
        }
        if (book.isDeleted) {
            return res.status(404).send({ status: false, message: "Book is already deleted" })
        }

        let deleteBook = await booksModel.findOneAndUpdate(
            { _id: bookId, isDeleted: false },
            { $set: { isDeleted: true, deletedAt: new Date() } },
            { new: true }
        )

        return res.status(200).send({ status: true, message: "deletion successful", data: deleteBook })
    } catch (err) { 
        return res.status(500).send({ status: false, message: err.message }) 
    }
}


module.exports = {
    createBooks,
    getBooks,
    getBooksById,
    updateBooksById,
    deleteBooksById
}