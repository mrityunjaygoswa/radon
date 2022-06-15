const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
     firstName: String,
    lastName: String,
    mobile: {
    type: Number,
   required: true,
    
},
emailId: String,
password: String,
gender: {
    type: String,
    enum: ["male", "female", "other"]
},
isdeleted :{
    type :Boolean,
    default:false
},
age: Number
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema)
