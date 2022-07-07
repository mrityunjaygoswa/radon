const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
const reviewSchema = new mongoose.Schema({
    bookId:{
        type:ObjectId,
        ref:"Book",
        require:true
    },
    reviewedBy:{
        type:String,
        trim:true,
        require:true,
        default:"Guest",
        value:String
    },
    reviewedAt:{
        type:Data,
        require:true
    },
    rating:{
        type:Number,
        min:1,
        max:5,
        require:true,
        
    },
    review:{
        type:String,

    },
    isDeleted:{
        type:Boolean,
        default:false
    }

},{ timestamps: true });

module.exports = mongoose.model("Review",reviewSchema);
