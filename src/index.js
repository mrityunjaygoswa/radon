const express = require('express');
const bodyParser = require('body-parser');
const route = require('./Routes/route.js');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://mohit08:BMqbHFaOsEjDesmP@cluster0.btwze.mongodb.net/Project-02", {
    useNewUrlParser: true
})
.then( () => console.log("WELCOME Mr. Mohit , MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});