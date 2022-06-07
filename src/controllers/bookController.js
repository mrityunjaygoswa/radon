const { count } = require("console")
const bookModel = require("../models/bookModel")
const BookModel= require("../models/bookModel")

const createBook= async function (req, res) {
    let data= req.body

    let savedData= await BookModel.create(data)
    res.send({msg: savedData})
}

const bookList = async function ( _req, res) 
{
    let allBooks =await bookModel.find().select({bookName:1 ,authorName:1,_id:0 })
return res.send({msg:allBooks})}

const getBooksInYear = async function(req,res)
{ let publishingYear = req.body.year
 let allBooks = await bookModel.find({year : publishingYear})
return res.send({msg:allBooks})
}   
const getXINRBooks = async function( _req,res){
    let inrBooks = await bookModel.find({$or :[{"price.indianPrice":{$eq :"100INR"}},
    {"price.indianPrice":{$eq:"200INR"}},{"price.indianPrice":{$eq :"500INR"}}
    ]})
     return res.send({msg:inrBooks})
} 
const getRandomBooks = async function( _req,res)
{let allBooks = await bookModel.find({$or :[{totalPages:{$eq : "500"}},{stockAvailable:true}]})
return res.send({msg : allBooks})
}




module.exports.createBook= createBook
module.exports.bookList=  bookList
module.exports.getBooksInYear =getBooksInYear
module.exports.getXINRBooks =getXINRBooks
module.exports.getRandomBooks=getRandomBooks