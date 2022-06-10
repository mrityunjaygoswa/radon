const publisherModel = require("../models/newPublisher")

const createPublisher= async function (req, res) {

    let publisher = req.body

    let publisherCreated = await publisherModel.create(publisher)

    res.send({data: publisherCreated}
        )}
        module.exports.createPublisher= createPublisher