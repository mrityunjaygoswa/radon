const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    title: {
        type: String,
        enum: ["Mr", "Mrs", "Miss"],
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type:String,
        required:true,
        unique:true,
        trim: true
    },
    email:{
        type: String,
        lowercase: true,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type: String,
        required:true,
        minLen: 8,
        maxLen: 15,
        trim:true
    },
    address: {
        street: String,
        city: String,
        pincode: String
    }
}, { timestamps: true });

module.exports = mongoose.model("User",userSchema);