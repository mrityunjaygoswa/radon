
const express = require('express');
const router = express.Router();
const FormDatae= require("../controller/controller.js")
const middleware = require("../middleware/middleware.js")
const FormID = require("../controller/Form.js")
router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
}) 

router.post("/createData", FormDatae.createData)
router.post("/createForm", FormID.createformid)
router.post("/login", FormDatae.loginId)

router.get("/id",FormDatae.getFormdata)

router.put("/users/:userId",FormDatae.updateFormData)
router.delete('/users/:userId',FormDatae.deleteForm)

module.exports = router;