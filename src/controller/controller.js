const { response } = require('express');
const { default: mongoose } = require('mongoose');
const FormData = require('../model/model.js');
const FormidModel = require("../model/form.js")
const jwt = require("jsonwebtoken");

const passwordregex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,20}$/
const nameregex= /^([a-zA-Z]+)$/
const emailRegex =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/



const createData = async function (req, res) {
    
    try {
        let data = req.body

        let { Title, Name, Mobile, Email,Password,Text,date,gender, Age,Formid} = data 

        if (Object.keys(data).length==0) {
            return res.status(400).send({ status: false, msg: " Please provide Form details" })
        }
      

       if (!Title) {
           return res.status(400).send({ status: false, msg: "Title is required" })
        }
        if(Name){
        if(!nameregex.test(Name)){
      return res.status(400).send({status:false,msg:"name should be in alphabetical format only"})
        } 
   }
       // if(Password){
     //if(!passwordregex.test(Password)){
       //return res.status(400).send({status:false, msg:"password should be an uppercase lowecase and a special character"})
      //}
    //}
      if(Email){
      if(!emailRegex.test(Email)){
        return res.status(400).send({status:false,msg:"email should be in the correct format"})
      }
    }
        let Formdata = await FormData.create(data)
       
        return res.status(201).send({status:true , msg:"new form data is created",data:Formdata})
        

    }

    catch (err) {
        res.status(500).send({ msg: "Error", error: err.message })
    }
}

const loginId = async function (req, res) {
    try{
    
    let data =req.body
    let {Email,Password}=data 

   // if(!(Email)){
   // return res.status(400).send({status:false, msg:"E-mail is required"})
   // }
    
   // if(!(emailRegex.test(Email))){
       // return res.status(400).send({status:false, msg:"E-mail should be a valid e-mail address"})
    //}
    
   // if(!(passwordregex.test(Password))){
     //   return res.status(400).send({status:false,msg:"password is One digit, one upper case , one lower case ,one special character, its b/w 6 to 20"})
    //}
    
    let Formdata = await FormidModel.findOne({ Email: Email, Password: Password });

    if (!Formdata)
      return res.status(401).send({status: false,msg: "Invalid login credential",});

let token = jwt.sign(                    
    {
      Formid : Formdata._id.toString(),
      project:"Form-Application"
    },
    'FormBuildUp'
  );
  res.setHeader("x-api-key", token);
  return res.status(200).send({ status: true,  msg: "successfully logged in",data:token });
}
catch (err){
    return res.status(500).send({ msg: "Error", error: err.message })
}
};


const getFormdata = async function (req, res) {

    try {
        let data = req.query;
        let{Formid}=data
        let FormDa = await FormData.find({ Formid: Formid });
        // if (FormData.length == 0) {
        //     res.status(400).send({ status: false, msg: "no data found with this id " })
        //     return;
        // }

        res.status(200).send({ status: true, msg: "FormData details accessed successfully", data: FormDa })
    }
    catch (err) {
        res.status(500).send({ msg: "Error", error: err.message })
    }
}


 
const updateFormData = async function (req, res) {

    try {
        let Formid = req.params.Formid;
        let data = req.body;

        if (Object.keys(data).length == 0)
            return res.status(400).send({ status: false, msg: "Body is required" });
       

        let FormData = await FormData.findOne({ Formid: Formid, isDeleted: false });

        if (!FormData) return res.status(404).send({ status: false, msg: "Form-Id related data unavailable" })
        //for(let ele in Formdata){
       // if(data.hasOwnProperty(ele)){
         //   FormData[ele] = data[ele]
       // }
       //else{
       //delete FormData[ele]
       //}
       
    //}
        if (data.Title) FormData.Title = data.Title;
        if (data.Text) FormData.Text = data.Text;
        if (data.Email) FormData.Email = data.Email;        // updating the title body and category
       
         // adding the tags

        blogData.publishedAt = Date();          // updating the date
        blogData.isPublished = true;
        FormData.save();                        // saving every updation

        res.status(200).send({ status: true, data: FormData });
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message });
    }
};

const deleteForm = async function (req, res) {

    try {
        let Formid = req.params.Formid
        if (!Formid) {
            res.status(400).send({ status: false, msg: "please enter Formid in param" })
            return;
        }

        let Form = await FormData.findOne({ $and: [{ _id: Formid }, { isDeleted: false }] })

        if (!Form)
            res.status(404).send({ status: false, msg: "No such Form exist or the Form is deleted" })

        if (Form.isDeleted == true)
        
            return res.status(404).send({ status: false, msg: "No such Form exist or the Form is deleted" })

        let afterDeletion = await blogModel.findOneAndUpdate({ _id: Formid }, { $set: { isDeleted: true } }, { new: true })

        return res.status(200).send({ status: true, data: afterDeletion, msg: "Blog deleted succesfully" })
    }
    catch (err) {
        res.status(500).send({ msg: "Error", error: err.message })
    }
}


module.exports.createData = createData
module.exports.loginId = loginId
module.exports.getFormdata = getFormdata
module.exports.updateFormData = updateFormData
module.exports.deleteForm = deleteForm
