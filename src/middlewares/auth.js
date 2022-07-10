const jwt = require('jsonwebtoken')

//---------------------------------------------------------authentication-----------------------------------------------------------------------//

const authentication = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key" || "X-Api-Key"]
        if (!token) {
            return res.status(400).send({ status: false, msg: "please send the token" })
        }

        let decodedToken = jwt.verify(token, "meWaDurHai-radon", function (error,token) {
            if (error) {
                return undefined
            } else {
                return token
            }
        })

        if (decodedToken == undefined) {
            return res.status(401).send({ status: false, msg: "invalid token" })
        }

        req["decodedToken"] = decodedToken
        next()

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

//---------------------------------------------------------authorization-----------------------------------------------------------------------//


module.exports = {
    authentication
}