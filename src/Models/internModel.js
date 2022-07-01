const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const internSchema = new mongoose.Schema({ 
    name:{
        type:String,
        required:'Intern name is required',
        trim:true
    },
    email:{
        type:String,
        required:'Email is required',
        trim:true,
        unique:true
    },
    mobile:{
        type:Number,
        required:'Mobile no is required',
        unique:true,
    },
    collegeId:{
        type:ObjectId,
        ref:'College',
        required:'CollegeId is required'
    },
    isDeleted:{
        type:Boolean,
        default:false
    }

    
},{timestamps:true})  

module.exports = mongoose.model('Intern', internSchema)
