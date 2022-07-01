
const express = require("express");
const router = express.Router()
const collegeController = require('../Controllers/collegeController')
const internController = require('../Controllers/InternController')
//--------------------------------------------------------//

router.get("/test-me", function (req, res) {
    res.send("My server is running awesome!")
})
//--------------------------------------------------------//

router.post("/create/colleges",collegeController.createCollege )
router.post("/create/interns", internController.createIntern)
router.get("/get/collegeDetails", collegeController.getCollegeDetails )

module.exports = router








