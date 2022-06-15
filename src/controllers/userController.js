

const jwt = require("jsonwebtoken");

const userModel = require("../models/userModel");



const createUser = async function (abcd, xyz) {

  let data = abcd.body;

  let savedData = await userModel.create(data);

  console.log(abcd.newAtribute);

  xyz.send({ msg: savedData });

};



const loginUser = async function (req, res) {

  let userName = req.body.emailId;

  let password = req.body.password;



  let user = await userModel.findOne({ emailId: userName, password: password });

  if (!user)

    return res.send({

      status: false,

      msg: "username or the password is not corerct",

    });

  

  let token = jwt.sign(

    {

      userId: user._id.toString(),

      batch: "thorium",

      organisation: "FunctionUp",

    },

    "functionup-radon"

  );

  res.setHeader("x-auth-token", token);

  res.send({ status: true, token: token });

};



const getUserData = async function (req, res) {

  let userId = req.params.userId;

  let userDetails = await userModel.findById(userId);
  

   res.send({ status: true, data: userDetails });

};



const updateUser = async function (req, res) {

  let userData = req.body;

  let userId = req.params.userId;

  let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData);

  res.send({ status: updateUser, data: updatedUser });

};



const deleteUser = async function (req, res) {

  let userId = req.params.userId;

  let deleted= await userModel.findOneAndUpdate({ _id: userId },{$set:{ isDeleted: true }}, {$new:true})

  res.send({msg: deleted })



}



module.exports.createUser = createUser;

module.exports.getUserData = getUserData;

module.exports.updateUser = updateUser;

module.exports.loginUser = loginUser;

module.exports.deleteUser = deleteUser;

