const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const express = require('express')

//---------------------------------------------------------cutSpaceFunction------------------------------------------------------------------//

const cutSpace = function (value) {
    try {
        return value.replace(/\s+/g, " ")
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

//-----------------------------------------------------------createUser-----------------------------------------------------------------------//

const createUser = async function (req, res) {
    try {

        let { title, name, phone, email, password, } = req.body

        if (Object.keys(req.body).length == 0) {
            return res.status(400).send({ status: false, message: "Please enter data in the request body" })
        }

        if (!title) {
            return res.status(400).send({ status: false, message: "title is missing" })
        }
        if (["Mr", "Mrs", "Miss"].indexOf(title) == -1) {
            return res.status(400).send({ error: "title has to be Mr or Mrs or Miss " })
        }

        if (!name) {
            return res.status(400).send({ status: false, message: "name is missing" })
        }
        if (name.trim().length !== 0) {
            if (!/^[a-zA-Z_ ]+$/.test(name)) {
                return res.status(400).send({ status: false, message: "Enter valid name" });
            }
        } else {
            return res.status(400).send({ status: false, message: "please enter name in correct format" });
        }

        if (!phone) {
            return res.status(400).send({ status: false, message: "phone no  is missing" })
        }
        if (! /^[6-9]\d{9}$/.test(phone)) {
            return res.status(400).send({ status: false, message: "phone no is not valid" })
        }
        let uniquePhone = await userModel.findOne({ phone: req.body.phone })
        if (uniquePhone) {
            return res.status(400).send({ status: false, message: `${phone} already exists` })
        }

        if (!email) {
            return res.status(400).send({ status: false, message: "email is missing" })
        }
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return res.status(400).send({ status: false, message: "Enter a valid emailId" });
        }
        let uniqueEmail = await userModel.findOne({ email: email })
        if (uniqueEmail) {
            return res.status(400).send({ status: false, message: `${email} already exists` })
        }

        if (!password) {
            return res.status(400).send({ status: false, message: "password is missing" })
        }
        if (!/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&@? "])[a-zA-Z0-9!#$%&@?]{8,20}$/.test(password)) {
            return res.status(400).send({ status: false, message: "Enter a valid password" });
        }

        let Name = cutSpace(name)
        req.body.name = Name

        let savedData = await userModel.create(req.body)
        return res.status(201).send({ status: true, message: " you are registered successfully", data: savedData })

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

//---------------------------------------------------------loginUser-------------------------------------------------------------------------//

const loginUser = async function (req, res) {
    try {
        let { email, password } = req.body;

        if (Object.keys(req.body).length == 0) {
            return res.status(400).send({ status: false, message: "please enter data in request body" })
        }

        if (!email) {
            return res.status(400).send({ status: false, message: "please enter email" })
        }

        if (!password) {
            return res.status(400).send({ status: false, message: "please enter password " })
        }

        let user = await userModel.findOne({ email: email, password: password });
        if (!user) {
            return res.status(401).send({ status: false, message: " your credentials are invalid" })
        }

        let token = jwt.sign(
            {
                authorId: user._id.toString(),
                iat: Math.floor(Date.now() / 1000),
                exp: Math.floor(Date.now() / 1000) + 50 * 60 * 60,
                batch: "radon",
                organisation: "functionUp"
            },
            "meWaDurHai-radon"
        )

        res.setHeader("x-api-key", token)

        return res.status(200).send({ status: true, message: "you are successfully loggedin", data: token })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}



module.exports = {
    cutSpace,
    createUser,
    loginUser
}