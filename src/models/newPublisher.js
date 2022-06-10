const mongoose = require("mongoose");
const newPublisherschema = new mongoose.Schema ({

    name : String,

    headquarter : String
}, 

{   timestamps:true  } 
);

module.exports = mongoose.model("newPublisher",newPublisherschema)