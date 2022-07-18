const urlModel = require("../models/urlModel");
const shortid = require('shortid')

const createUrl = async function (req, res) {
  try {
    const longUrl = req.body.longUrl

    const str = 'http://localhost:3000/'
    const urlCode = shortid.generate()
    const shortUrl = str + urlCode 
    const savedData = await urlModel.create({longUrl, shortUrl, urlCode})
   let obj= {longUrl: savedData.longUrl,
    shortUrl: savedData.shortUrl,
    urlCode: savedData.urlCode}
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
    const getUrl  = await urlModel.findOne({ urlCode });

    // if (!shortid.isValid(urlCode)) { return res.status(400).send({ status: false, message: "invalid URL" })} 
    // if (!getUrl) { return res.status(404).send({ status: false, message: "URL not found" })} 

    return res.status(302).send({ status: true, message: "success", data: getUrl.longUrl })
  
    }
    catch (err) {
      return res.status(500).send({ status: false, message: err.message })
    }
  }

  module.exports.getUrl = getUrl
