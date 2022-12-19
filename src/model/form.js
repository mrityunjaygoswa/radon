const mongoose = require("mongoose")

const FormidModel = new mongoose.Schema({
    Email:{
    type:String,
    required : true},

    Password:{
        type:String,
        required:true
    }

},{timestamps:true});

module.exports = mongoose.model("FORMID",FormidModel)