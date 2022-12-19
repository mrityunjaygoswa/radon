const express = require("express")
const mongoose = require("mongoose")
const FormidModel = require('../model/form.js')

const passwordregex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,20}$/
const  emailRegex =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

const createformid = async function(req,res){
    let data = req.body 
    let {Email,Password}=data 

    if(Object.keys(data).length==0){
return res.status(400).send({status: false,msg:"Details necesary"})
    }

if(!emailRegex.test(Email)){
    return res.status(400).send({status:false,msg:"Email id should be valid"})
}
//if(!passwordregex.test(Password)){
   // return res.status(400).send({status:false,msg:"Password should be an uppercase, lowercase and a special character"})
//}
    let signin = await FormidModel.create(data)
    return res.status(201).send({status:true,msg:"successfully entered details",data:signin})
}

module.exports.createformid = createformid
