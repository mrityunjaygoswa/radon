
const jwt = require("jsonwebtoken");

const userModel = require("../models/userModel");

const authenticate = function(req, req, next) {

    let token = req.headers["x-Auth-token"];

    if (!token) token = req.headers["x-auth-token"]

    if (!token) return res.send({ status: false, msg: "token must be present" });

  

    let decodedToken = jwt.verify(token, "functionup-radon");

  if (!decodedToken)

    return res.send({ status: false, msg: "token is invalid" });



    let userId = req.params.userId;

    let userDetails =  userModel.findById(userId);

    if (!userDetails)

      return res.send({ status: false, msg: "No such user exists" });


    next()
}


const authorise = function(req, res, next) {

    let token = req.headers["x-auth-token"]
    let decodedToken = jwt.verify(token, 'functionup-thorium')

    if(!decodedToken) return res.send({status: false, msg:"token is not valid"})
    
    
    let userToBeModified = req.params.userId
    
    let userLoggedIn = decodedToken.userId

    
    if(userToBeModified != userLoggedIn) return res.send({status: false, msg: 'User logged is not allowed to modify the requested users data'})


    next()
} 
module.exports.authenticate=authenticate
module.exports.authorise=authorise