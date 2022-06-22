
const authorModel = require("../models/authorModel");
const blogModel = require("../models/blogModel");
const router = require("../routes/route");

const createBlog = async function (req, res) {
    try {
        let data = req.body;
        let Id = data.authorId;
        if (!Id) {
            res.status(400).send("please enter author id")
            return;
        }
        let authorId = await authorModel.findById(Id);
        if (!authorId) {
            res.status(400).send("please enter valid userId")
        }
        let result = await blogModel.create(data)
        res.status(201).send({
            status: true,
            data: result
        })
    } catch (err) {
        res.status(500).send({
            status: false,
            msg: err.message
        })
    }
}




const listing = async function(req,res){
    
        try{
                let qwery = req.query
                let filter = {
                    isDeleted: false,     
                    isPublished: false,
                    ...qwery
                }
                 console.log(filter)
    
                const filterByQuery = await blogModel.find(filter)  
                if(filterByQuery.length == 0) {
                    return res.status(404).send({status:false, msg:"No blog found"})
                }
                console.log("Data fetched successfully")
                res.status(201).send({status:true, data:filterByQuery})
        }
        catch(err) {
        console.log(err)
        res.status(500).send({status:false, msg: err.message})
        }
    }  
    const updateBlog = async function(req, res){
        try{
            const blogId = req.params.blogId
            const Details = req.body
            const validId = await blogModel.findById(blogId)   
            if (!validId){
                return res.status(400).send({status:false, msg:"Blog Id is invalid"})   
            }
            const authorIdFromParam = req.params.authorId
            const authorIdFromBlog = validId.authorId.toString()    
            if (authorIdFromParam !== authorIdFromBlog) {          
                return res.status(401).send({status : false, msg : "This is not your blog, you can not update it."})
            }
            const updatedDetails = await blogModel.findOneAndUpdate(
                {_id : blogId},    
                {title : Details.title, body : Details.body, tags : Details.tags,
                subcategory : Details.subcategory, isPublished : true, publishedAt : new Date()},
                {new : true, upsert : true})    
            res.status(201).send({status:true, data:updatedDetails})
        }
        catch(err) {
            console.log(err)
            res.status(500).send({status:false, msg: err.message})
        }
    }

    const deleteBlogById = async function(req, res){
        try{
            const blogId = req.params.blogId
            const validId = await blogModel.findById(blogId)   
            if (!validId){
                return res.status(400).send({status:false, msg:"Blog Id is invalid"})
            }
            const authorIdFromParam = req.params.authorId
            const authorIdFromBlog = validId.authorId.toString()    
            console.log(authorIdFromBlog, authorIdFromParam)
            if (authorIdFromParam !== authorIdFromBlog) {          
                return res.status(401).send({status : false, msg : "This is not your blog, you can not delete it."})
            }       
            const deletedDetails = await blogModel.findOneAndUpdate(
                {_id : blogId},
                {isDeleted : true, deletedAt : new Date()},
                {new : true})    
            res.status(201).send({status:true, data:deletedDetails})
        }
        catch(err) {
            console.log(err)
             res.status(500).send({status:false, msg: err.message})
        }
    }
    const deleteBlogByQuery = async function(req, res){
        try{
        let qwery = req.query
            let filter = {...qwery}
            const filterByQuery = await blogModel.find(filter)    
            console.log(filterByQuery)
            if(filterByQuery.length == 0){
                return res.status(404).send({status:false, msg:"No blog found to delete"})
            }    
            const authorIdFromParam = req.params.authorId
            for (let i=0; i<filterByQuery.length; i++){
                let authorIdFromBlog = filterByQuery[i].authorId.toString()   
                console.log(authorIdFromBlog)
                if (authorIdFromBlog == authorIdFromParam){     
                    const deletedDetails = await blogModel.findOneAndUpdate(
                        filter,
                        {isDeleted : true, deletedAt : new Date()},   
                        {new : true})   
                    res.status(201).send({status:true, data:deletedDetails})
                    break
                }else {
                    return res.status(401).send({status : false, msg : "This is not your blog, you can not delete it."})
                }
            }
        }
        catch(err) {
            console.log(err)
            res.status(500).send({status:false, msg: err.message})
            }
    }
//const update = async function(req,res){
   // let data =req.query
   // let blogid= data.Id
   // if(!blogid||isDeleted==true){ res.status(404).send({status:false,msg:"error user id not found"})}

//}

module.exports.createBlog = createBlog;
module.exports.listing=listing;
module.exports.updateBlog = updateBlog
module.exports.deleteBlogById = deleteBlogById
module.exports.deleteBlogByQuery = deleteBlogByQuery
//module.exports.getAllBLogs = getAllBLogs