const mongoose = require("mongoose")
let validateUrl = function(logoLink){
    urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/
    return urlRegex.test(logoLink)
}

const collegeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:'College name is must required',
        unique:true,
        trim:true
    },
    fullName:{
        type:String,
        required:'Fullname of college is required',
        trim:true
    },
    logoLink:{
        type:String,
        required:'Logolink is required',
        trim:true, 
        validate: [validateUrl, "Provide valid url." ]
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

module.exports = mongoose.model('College', collegeSchema)