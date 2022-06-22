const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController")
const blogController= require("../controllers/blogController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createAuthor", authorController.createAuthor )
router.post("/blog",blogController.createBlog)
//router.get("/notDeleted",blogController.notDeleted)
router.get("/listing",blogController.listing)
router.put('/blogs/:authorId/:blogId',blogController.updateBlog) 
router.delete('/blogs/:authorId/:blogId',blogController.deleteBlogById)  
router.delete('/blogs/:authorId',blogController.deleteBlogByQuery)  
//router.get("/getAllBlogs",blogController.getAllBLogs)

module.exports = router;