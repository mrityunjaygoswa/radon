//Import Modules
const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const mongoose = require('mongoose');
// const validUrl = require('shortid valid-url');
   
   
 
const app = express();

app.use(bodyParser.json()); 

   
//Connecting Data-Base
mongoose.connect("mongodb+srv://Aishwarya123:sg8eJZVpV9e3eEP3@cluster0.gf2pu4l.mongodb.net/group49Database", {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))
     
        
app.use('/', route)
 
//Connecting on port
app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});