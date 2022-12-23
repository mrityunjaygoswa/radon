import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors());
app.use(cors({ exposedHeaders: 'auth-token' }))




mongoose.connect("mongodb+srv://mrityunjay:rebornexcellence@cluster0.eq0al.mongodb.net/functionupradon", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("DB connected")
})

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const User = new mongoose.model("User", userSchema)

//Routes
app.post("/login", (async(req, res)=> {
    let {email,password} = req.body;
    let findUser = await User.findOne({email:email})
    let encrypted = findUser.password;
    const decrypt = await bcrypt.compare(password,encrypted,(err,data)=>{
        if(data){  
            let id = findUser._id;
            var token = jwt.sign({ userId: id }, '1234*&^');
            res.setHeader("x-api-key",token);            
            res.send({message: "User logged in successfully"})            
        }else{
            res.send({message:"user doesn't match"})
        }
    })
})) 

app.post("/register", (async(req, res)=> {
    let { name, email, password} = req.body
    let encryptPassword = await bcrypt.hash(password,10) 

    User.findOne({email: email}, (err, user) => {
        if(user){
            res.send({message: "User already registerd"})
        } else {  
               console.log(encryptPassword,password)
               password =  encryptPassword;               
            const user = new User({
                name,
                email,
                password
            })
            user.save(err => {
                if(err) {
                    res.send(err)
                } else {
                    res.send( { message: "Successfully Registered, Please login now." })
                }
            })
        }
    })
    
}) )

app.listen(9002,() => {
    console.log("BE started at port 9002")
})