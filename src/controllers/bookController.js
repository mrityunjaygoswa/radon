const authorModel = require("../models/newAuthorModel")
const bookModel= require("../models/newbookModel")

const createBook= async function (req, res) {
    let Book = req.body
    let bookCreated = await bookModel.create(Book)
    res.send({data: bookCreated})
}

const getBooksData= async function (req, res) {
    let books = await bookModel.find()
    res.send({data: books})
}

const getBooksWithAuthorpublisherDetails = async function (req, res) {
    let specificBook = await bookModel.find().populate('author_id')
    res.send({data: specificBook})

}

module.exports.createBook= createBook
module.exports.getBooksData= getBooksData
module.exports.getBooksWithAuthorpublisherDetails = getBooksWithAuthorpublisherDetails
