const { before, filter } = require("lodash")
const { prependListener } = require("../Models/collegeModel")
const collegeModel = require("../Models/collegeModel")
const internModel = require("../Models/internModel")

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}
const isValidRequestBody = function (request) {
    return (Object.keys(request).length > 0)
}

const nameRegex = /^[a-zA-Z\\s]{2,10}$/                 // will not consider space between
const fullNameRegex = /^[a-zA-Z ]{2,100}$/               //    <--- consider space between

const urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/

// Create College
const createCollege = async function (req, res) {
    try {
        const collegeData = req.body
        const { name, fullName, logoLink } = collegeData

        if (!isValidRequestBody(collegeData)) return res.status(400).send({ status: false, message: "No input by user." })
        if (!isValid(name)) return res.status(400).send({ status: false, message: "College name is required." })
        if (!isValid(fullName)) return res.status(400).send({ status: false, message: "College Full name is required." })
        if (!isValid(logoLink)) return res.status(400).send({ status: false, message: "College Logo Link is required." })

        if (!nameRegex.test(name)) return res.status(400).send({ status: false, message: "Not a valid name." })
        if (!fullNameRegex.test(fullName)) return res.status(400).send({ status: false, message: "Not a valid Full name. Can only contains alphabets." })
        if (!urlRegex.test(logoLink)) return res.status(400).send({ status: false, message: "Not a valid url." })

        const findCollegeName = await collegeModel.findOne({name})
        if (findCollegeName) return res.send({ status: false, message: `${name} is already registered.` })

        const newCollege = await collegeModel.create(collegeData)
        res.status(201).send({ status: true, message: "College created succesfully.", data: newCollege })

    }
    catch (err) {
        return res.status(500).send({ status: false, message: "Error", error: err.message })
    }
}

// Get College Details
const getCollegeDetails = async function (req, res) {
    try {
        const userQuery = req.query
        if (!isValidRequestBody(userQuery)) return res.status(400).send({ status: false, message: "No college name entered." })

        const collegeName = req.query.collegeName
        const getCollegeName = await collegeModel.findOne({ name: collegeName, isDeleted: false })

        if (!getCollegeName) return res.status(404).send({ status: false, message: "No colleges found with this name" })

        const getCollegeId = getCollegeName._id
        const findIntern = await internModel.find({ collegeId: getCollegeId, isDeleted: false }).select({ name: 1, email: 1, mobile: 1 })


        if (findIntern.length === 0) return res.status(404).send({ status: false, message: `No Internship applications submitted at ${collegeName} till now.` })

        const allInterns = {
            name: getCollegeName.name,
            fullName: getCollegeName.fullName,
            logoLink: getCollegeName.logoLink,
            interests: findIntern
        }
        res.status(200).send({ status: true, data: allInterns })
    }
    catch (err) {
        return res.status(500).send({ status: false, message: "Error", error: err.message })
    }
}

module.exports.createCollege = createCollege
module.exports.getCollegeDetails = getCollegeDetails






