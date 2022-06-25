const express = require('express');
const router = express.Router();
const middleware = require('../middlewares/middleware.js');
const authorLogin = require('../controllers/logincontroller.js');
const authorController= require("../controllers/authorController")
const blogController= require("../controllers/blogController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createAuthor", authorController.createAuthor )
router.post("/blog",blogController.createBlog)
router.post('/login',authorLogin.loginAuthor) 
router.get("/listing",blogController.listing)
router.put('/blogs/:authorId/:blogId', middleware.authenticate, middleware.authorize,blogController.updateBlog) 
router.delete('/blogs/:authorId/:blogId',middleware.authenticate, middleware.authorize,blogController.deleteBlogById)  
router.delete('/blogs/:authorId',middleware.authenticate, middleware.authorize,blogController.deleteBlogByQuery)  


module.exports = router;

