const mongoose = require('mongoose');

const FormData = new mongoose.Schema( {


    Title :{
        type : String,
        required : true
    
    },
    Name: String, 

    Mobile:String,

    Email: String,

    Password: String,

    Text : String,

    date :{
        type: Date,
        default :Date.now()
    },

    gender: {
        type: String,
        enum: ["male", "female", "other"]
    },

    Age: Number,

    Formid : {
    type :mongoose.Schema.Types.ObjectId,
    ref:'FORMID',
    required :true
    },
    
    isDeleted: {
        type: Boolean, 
        default: false
   }
    
}, { timestamps: true });

module.exports = mongoose.model('Form', FormData)