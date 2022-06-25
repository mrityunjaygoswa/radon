const jwt = require('jsonwebtoken');
const authorModel = require('../models/authorModel.js');

//const login = async function(req, res){
   // try{
       // let author = req.body
       // const userName = author.email
       // const password = author.password
      //  let authorCred = await authorModel.findOne({ email: userName, password: password});   
      //  if (!authorCred)
          //return res.status(401).send({status: false, msg: "Username & Password is not correct, Please check your credentials again.",})
        
        //  let token = jwt.sign(   
        //    {
            //  authorId : authorCred._id.toString()   
         //   },
          //  "Project/blogs" 
         // );
         // res.setHeader("x-api-key", token);  
        //  res.send({ status: true, data: token });  
    //}
    //catch (err) {
    //  res.status(500).send({status:false, msg : err.message})
    //}
  //}

  


const loginAuthor = async function (req, res) {
  try{
  
  let data =req.body
  let {email,password}=data //extract params


  if(!isValidRequestBody(data)){
      return res.status(400).send({status:false, msg : "Invalid request parameters.Please provide login details"})
  }
  // data should not be empty

  if(!isValid(email)){
  return res.status(400).send({status:false, msg:"E-mail is required"})
  }
  //email should be valid

  if(!(emailRegex.test(email))){
      return res.status(400).send({status:false, msg:"E-mail should be a valid e-mail address"})
  }
  //validating email with regex
  /*------------------------------------------------------------------------------------------------------*/
  // if(!isValid(password))
  // return res.status(400).send({status:false, msg:"password must be present"})
  /* ------------------------------------------------------------------------------------------------------*/
  if(!(passwordregex.test(password))){
      return res.status(400).send({status:false,msg:"password is One digit, one upper case , one lower case ,one special character, its b/w 6 to 20"})
  }
  //validating password with regex

  let author = await authorModel.findOne({ email: email, password: password });

  if (!author)
    return res.status(401).send({status: false,msg: "Invalid login credential",});

let token = jwt.sign(                    //making the token
  {
    authorId: author._id.toString(),
    project:"blogging-Site"
  },
  'author-blog'
);
res.setHeader("x-api-key", token);
return res.status(200).send({ status: true,  msg: "Author successfully logged in",data:token });
}
catch (err){
  return res.status(500).send({ msg: "Error", error: err.message })
}
};
module.exports.loginAuthor = loginAuthor