const express = require('express')
const userController = require('../controllers/userController')
const booksController = require('../controllers/booksController')

const router = express.Router();

router.post('/register',userController.createUser)
router.post('/login',userController.loginUser)
router.post('/books',booksController.createBooks)
// router.get('/books',booksController.getBooks)
// router.get('/books/:bookId',booksController.getBooksById)
// router.put('/books/:bookId',booksController.updateBooksById)
// router.delete('/books/:bookId',booksController.deleteBooksById)
// router.post('/books/:bookId/review',booksController.reviewBooksById)
// router.put('/books/:bookId/review/:reviewId',booksController.updateReview)
// router.delete('/books/:bookId/review/:reviewId',booksController.deleteByReview)

module.exports = router;