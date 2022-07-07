const userController = require('../controllers/userController');
const booksModel = require('../models/booksModel');
const bookModel = require('../models/booksModel')
const mongoose = require('mongoose')
const moment = require('moment')

// let {cutSpace} = userController

const createBooks = async function (req, res) {

    try {
        let data = req.body
        let { title, excerpt, userId, ISBN, category,subcategory,releasedAt } = req.body;
        // let blogTitle = cutSpace(title)
        // req.body.title = blogTitle
        // let excerptBody = cutSpace(excerpt)
        // req.body.excerpt = excerptBody

        // var formated_date = moment(releasedAt).format('YYYY-MM-DD');
        // console.log(formated_date)
        // hjgjh =await formated_date.save()
        // data.releasedAt = hjgjh



        if (Object.keys(req.body).length == 0) {
            return res.status(400).send({ status: false, msg: "Please request data to be created" })
        }
        let uniqueCheck = await booksModel.findOne({$or:[{title:title},{ISBN: ISBN}]})
        if (uniqueCheck){
            return res.status(400).send({ status: false, msg: "title/ISBN already exists"})
        }

        if (!title) {
            return res.status(400).send({ status: false, msg: "Please enter title" })
        }

        if (!excerpt) {
            return res.status(400).send({ status: false, msg: "Please enter excerpt"})
        }

        if (excerpt.length < 6) {
            return res.status(400).send({status: false, msg: "excerpt length should be more than 4 characters"})
        }

        if (!userId) {
            return res.status(400).send({ status: false, msg: "Please enter userId" })
        }

        if (userId.length !== 24) {
            return res.status(400).send({ status: false, msg: "Please enter proper length of user Id (24)" })
        }
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).send({ status: false, msg: "Please enter valid userId" })
        }

        if (!ISBN) {
            return res.status(400).send({ status: false, msg: "Please enter ISBN" })
        }
        if (!/^[0-9]*[-| ][0-9]*[-| ][0-9]*[-| ][0-9]*[-| ][0-9]*$/.test(ISBN)) {
            return res.status(400).send({ status: false, msg: "Please enter  valid ISBN" })
        }

        if (!category) {
            return res.status(400).send({ status: false, msg: "Please enter category" })
        }
        if (!subcategory) {
            return res.status(400).send({ status: false, msg: "Please enter subcategory" })
        }
        if (!releasedAt) {
            return res.status(400).send({ status: false, msg: "Please enter releasing time" })
        }

        let createdBooks = await booksModel.create(req.body)
        return res.status(201).send({ status: true, msg: "Your book has been created successfully", data: createdBooks })
    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}


const getBooks = async function (req, res) {
    try {
        let {userId, category, subcategory } = req.query

        if (Object.keys(req.query).length == 0) {
            return res.status(400).send({ status: false, msg: "Please request data in query to be created" })
        }

        if (!userId) {
            return res.status(400).send({ status: false, msg: "Please enter userId" })
        }
        // if (userId.length !== 24) {
        //     return res.status(400).send({ status: false, msg: "Please enter proper length of user Id (24)" })
        // }
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).send({ status: false, msg: "Please enter valid userId" })
        }

        // if (!category) {
        //     return res.status(400).send({ status: false, msg: "Please enter category" })
        // }
        // if (!subcategory) {
        //     return res.status(400).send({ status: false, msg: "Please enter subcategory" })
        // }

        let books = await booksModel.find( {isDeleted: false, $or:[{userId:userId},{category:category}, {subcategory: subcategory}]} ).sort({userId:1, category:1, subcategory:1 }).select({_id:1, title:1, excerpt:1, userId:1, category:1, reviews:1, releasedAt:1})
       console.log()
        if (!books[0]) {
            return res.status(404).send({ status: false, msg: "no such books found" })
        }

        return res.status(200).send({ status: true, msg: "here all books are, related to your search", data: books })
    } catch (err) {
       return res.status(500).send({ status: false, msg: err.message })
    }
}


module.exports = {
    createBooks,
    getBooks
}