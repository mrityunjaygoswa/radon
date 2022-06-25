const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://mrityunjay:rebornexcellence@cluster0.eq0al.mongodb.net/functionupradon")
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});



for (i=0;i<Array.length;i++)
{ let count=0;
for(j=2;j<10;j++){

do{
    count++
}
while(Array[i]%j===0)
}
if(count>1){ break}
else {
    console.log(a[i])
}
}