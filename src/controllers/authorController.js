const authorModel = require("../models/authorModel")

const isValid = function(value)
{
    if(typeof value === 'undefined' || value === null){
        return false
    }
    
    if(typeof value === 'string' && value.trim().length == 0){
        return false
    }
    
    return true             

} 

const isValidTitle = function(title){
    return ["Mr", "Mrs","Miss"].indexOf(title)!== -1
}


//-----------------------------------------------------second method--------------------------------------------------------//
// Or we can use  this for title validation

// const isValidTitle = function(title){
//     return ["Mr", "Mrs","Miss"].includes(title)
// }



const nameregex= /^([a-zA-Z]+)$/
//regex for validate the name because name should be alphabetical only
const emailRegex =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
// regex for email validation
const passwordregex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,20}$/
//  One digit, one upper case , one lower case ,one special character, its b/w 6 to 20

const isValidRequestBody = function(request){  
    return Object.keys(request).length>0
}

//const createAuthor = async function (req, res) {
    //try {
       // let data = req.body;
        //let result = await authorModel.create(data);
       // res.status(201).send(result);
    //}
    //catch (err) {
      //  res.status(500).send({ error: err.message })
    //}
//}

const createAuthor = async function(req,res){
    
    try{
    let data = req.body
    let {fname, lname, title, email, password}= data  //object destructinng
// ---------------------------------------------* validations starts *---------------------------------------------//
    
    if(!isValidRequestBody(data)){
        return res.status(400).send({status:false, msg : "Invalid request parameters. Please provide author details"})
    }
    //here checking the data come from request body should not be empty

    /*---------------------------------------------second method ---------------------------------------------------*/
    // if(!isValid(fname))
    // return res.status(400).send({status:false, msg : "First name is required"})
    
    // if(!isValid(lname))
    // return res.status(400).send({status:false, msg : "Last name is required"})
    /*---------------------------------------------------------------------------------------------------------------*/


       if(!nameregex.test(fname)){
        return res.status(400).send({status:false,msg:"please enter alphabets only"})
       }
       //    validating the name with regex

       if(!nameregex.test(lname)){
        return res.status(400).send({status:false,msg:"please enter alphabets only"})
       }
       //      validating the last name with regex

    if(!isValid(title))
     return res.status(400).send({status:false, msg:"Title is required"})
     if (!isValidTitle(title)) {
        return res.status(400).send({ status: false, message: "Title should be among Mr, Mrs, Miss" })
    }
    //validating the title with above two function

    if(!isValid(email))
    return res.status(400).send({status:false, msg:"E-mail is required"})
    // validating the email

    let authorEmail= await authorModel.find({email:data.email})
    if(authorEmail.length!==0)
    return res.status(401).send({status:false, msg:"This e-mail address is already exist , Please enter valid E-mail address"})
    //checking the author email is correct or not 

    if(!(emailRegex.test(email))){
        return res.status(400).send({status:false, msg:"E-mail should be a valid e-mail address"})
    }
    // validating the email with regex
    
    /*-------------------------------------------------------------------------------------------------*/
    // if(!isValid(password))
    // return res.status(400).send({status:false, msg:"password is not exist"})
    /*--------------------------------------------------------------------------------------------------*/

    if(!(passwordregex.test(password))){
        return res.status(400).send({status:false,msg:"password is One digit, one upper case , one lower case ,one special character, its b/w 6 to 20"})
    }
    //validating the email with regex

    let authorCreated = await authorModel.create(data)
    return res.status(201).send({status:true,msg: "Author created successfully", data : authorCreated})
}
catch(err){
    return res.status(500).send({msg:"Error", error:err.message})
}
    
}
module.exports.createAuthor = createAuthor