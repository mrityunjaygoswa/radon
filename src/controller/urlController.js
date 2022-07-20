const urlModel = require("../models/urlModel");
const shortid = require('shortid')
const validUrl = require('valid-url')
const redis = require('redis')
const { promisify } = require("util");


//Connect to redis
const redisClient = redis.createClient(
  13190,
  "redis-13190.c301.ap-south-1-1.ec2.cloud.redislabs.com",
  { no_ready_check: true }
);
redisClient.auth("gkiOIPkytPI3ADi14jHMSWkZEo2J5TDG", function (err) {
  if (err) throw err;
});

redisClient.on("connect", async function () {
  console.log("Connected to Redis..");
});
 
//Connection setup for redis

const SET_ASYNC = promisify(redisClient.SET).bind(redisClient);
const GET_ASYNC = promisify(redisClient.GET).bind(redisClient);

const createUrl = async function (req, res) {
  try {
    const longUrl = req.body.longUrl

    if (!longUrl ){
        return res.status(400).send({status:false, message:"Body should be not empty."})
    }

    if (!validUrl.isUri(longUrl)){
      return res.status(400).send({status:false, message:"URL incorect"})
    }

    const str = 'http://localhost:3000/'
    const urlCode = shortid.generate()

    const shortUrl = str + urlCode

    const savedData = await urlModel.create({longUrl, shortUrl, urlCode})

   let obj= {
    longUrl: savedData.longUrl,
    shortUrl: savedData.shortUrl,
    urlCode: savedData.urlCode
}

    return res.status(201).send({ status: true, message: "success", data: obj })

  }
  catch (err) {
    return res.status(500).send({ status: false, message: err.message })
  }
}

module.exports.createUrl = createUrl


const getUrl = async function (req, res) {
    try {
        
      const urlCode = req.params.urlCode

      if (!shortid.isValid(urlCode)){
         return res.status(400).send({ status: false, message: "invalid URL" })
        } 
       
      let cahcedProfileData = await GET_ASYNC(`${urlCode}`)

      if(cahcedProfileData) {
         res.send(cahcedProfileData)
       } else {

      const getUrl  = await urlModel.findOne({ urlCode });

      if (!getUrl) { return res.status(404).send({ status: false, message: "URL not found" })}
  
      await SET_ASYNC(`${urlCode}`, JSON.stringify(getUrl))
  
      return res.status(302).send({ status: true, message: "success", data: getUrl.longUrl })
    
      }
    }
    catch (err) { 
      return res.status(500).send({ status: false, message: err.message })
    }
  }
  

  module.exports.getUrl = getUrl

  // const fetchAuthorProfile = async function (req, res) {
  //   let cahcedProfileData = await GET_ASYNC(`${req.params.authorId}`)
  //   if(cahcedProfileData) {
  //     res.send(cahcedProfileData)
  //   } else {
  //     let profile = await authorModel.findById(req.params.authorId);
  //     await SET_ASYNC(`${req.params.authorId}`, JSON.stringify(profile))
  //     res.send({ data: profile });
  //   }
  
  // };

  // const urlCode = req.params.urlCode
  //   if (!shortid.isValid(urlCode)) { return res.status(400).send({ status: false, message: "invalid URL" })} 
     
  //   let cahcedProfileData = await GET_ASYNC(`${urlCode}`)
  //   if(cahcedProfileData) {
  //      res.send(cahcedProfileData)
  //    } else {

  //   const getUrl  = await urlModel.findOne({ urlCode });
  //   if (!getUrl) { return res.status(404).send({ status: false, message: "URL not found" })}

  //   await SET_ASYNC(`${urlCode}`, JSON.stringify(getUrl))

    
     

  //   return res.status(302).send({ status: true, message: "success", data: getUrl.longUrl })
  
  //   }

