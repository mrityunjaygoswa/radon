//const authentication = function(req,res,next){
   // let data= req.body
  //  let emailid= data.email
   // let pasword= data.password
   // let valid = await authorModel.find(emailid==email&&pasword==password);
   // if(!valid){res.status(404).send({msg:"invalid user id and password"})}
    //let token=jwt.sign()
//}

const jwt = require('jsonwebtoken');

 let authentication = async function(req, res, next){
    try{
        let token = req.headers['x-api-key']
       if (!token){
           return res.status(400).send({ msg: "Token must be present" });
        }
       next()
    }
    catch (err) {
        console.log(err)
        res.status(500).send({error : errorFound.message})
   }
 }


 let authorization = async function(req, res, next){
    try {
        let token = req.headers['x-api-key']
        let decodedToken = jwt.verify(token, "Project/blogs");
        let usedLoggedIn = decodedToken.authorId
         let param_Id = req.params.authorId
        if (usedLoggedIn !== param_Id) return res.status(403).send("You are not autherised to access.") 
        next()
    }
    catch (err) {
        console.log(err)
        res.status(500).send({error : errorFound.message})
    }
 }

 module.exports.authenticate = authentication
 module.exports.authorize = authorization

 