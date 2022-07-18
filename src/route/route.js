const express = require('express')
const userController = require('../controllers/userController')
const booksController = require('../controllers/booksController')
const reviewController = require('../controllers/reviewsController')
const middleware = require('../middlewares/auth')
//const aws= require("aws-sdk")
const router = express.Router();


       

router.post('/register', userController.createUser)
router.post('/login', userController.loginUser)


router.post('/books', middleware.authentication, middleware.authorization1, booksController.createBooks)
router.get('/books', middleware.authentication, booksController.getBooks)
router.get('/books/:bookId', middleware.authentication, booksController.getBooksById)
router.put('/books/:bookId', middleware.authentication, middleware.authorization2, booksController.updateBooksById)
router.delete('/books/:bookId', middleware.authentication, middleware.authorization2, booksController.deleteBooksById)


router.post('/books/:bookId/review', reviewController.addreviewsById)
router.put('/books/:bookId/review/:reviewId', reviewController.updateReview)
router.delete('/books/:bookId/review/:reviewId', reviewController.deleteReview)

module.exports = router