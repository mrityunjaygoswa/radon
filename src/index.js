const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const route = require('./route/route')

const multer = require("multer")
const { AppConfig } = require('aws-sdk')

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use('/',route)
app.use(multer().any())

const string = "mongodb+srv://WASIF321:Ansari738871@wasifdatabase.wdcjr.mongodb.net/group42Database"

mongoose.connect(string, {useNewUrlParser: true})
.then(()=>console.log("mongoDB is connected"))
.catch((err)=>console.log(err));

const port = process.env.PORT || 4000
app.listen(port,function(){
    console.log("app is running on the port"+port)
})
