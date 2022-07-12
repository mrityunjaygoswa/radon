const jwt = require('jsonwebtoken')
const booksModel = require('../models/booksModel')
const mongoose = require('mongoose')

//---------------------------------------------------------authentication-----------------------------------------------------------------------//

const authentication = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key" || "X-Api-Key"]
        if (!token) {
            return res.status(400).send({ status: false, message: "please send the token" })
        }

        let decodedToken = jwt.verify(token, "meWaDurHai-radon", function (err, token) {
            if (err) {
                return undefined
            } else {
                return token
            }
        })

        if (decodedToken == undefined) {
            return res.status(401).send({ status: false, message: "invalid token" })
        }

        req["decodedToken"] = decodedToken

        next()

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

//---------------------------------------------------------authorization1-----------------------------------------------------------------------//

const authorization1 = async function (req, res, next) {
    try {
        let validUserId = req.decodedToken.userId
        let userId = req.body.userId

        if (!userId) {
            return res.status(400).send({ status: false, message: "Please enter userId" })
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).send({ status: false, message: "Please enter valid userId" })
        }

        if (userId != validUserId) {
            return res.status(403).send({ status: false, message: "Author is not authorized" })
        }

        next()

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}


//---------------------------------------------------------authorization2-----------------------------------------------------------------------//

const authorization2 = async function (req, res, next) {
    try {
        let validUserId = req.decodedToken.userId
        let bookId = req.params.bookId

        if (!mongoose.Types.ObjectId.isValid(bookId)) {
            return res.status(400).send({ status: false, message: "Please enter valid bookId" })
        }

        let checkBooks = await booksModel.findById(bookId)

        if (!checkBooks) {
            return res.status(404).send({ status: false, message: "no such book exists" })
        }
        if (checkBooks.userId != validUserId) {
            return res.status(403).send({ status: false, message: "Author is not authorized" })
        }

        if (checkBooks.isDeleted == true) {
            return res.status(404).send({ status: false, message: "this document is  already deleted" })
        }

        next()

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

module.exports = {
    authentication,
    authorization1,
    authorization2,
}