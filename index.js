const express=require('express');
const bcrypt=require('bcrypt');
const jwt=require("jsonwebtoken");
require("dotenv").config()

const {connection}=require('./utils/db')
const cors=require('cors');
const {furnitureRoutes}=require('./routes/furniture.route');
const {UserModel}=require("./models/userss.model");
const { authentication } = require('./authenticator/auth');
const {cartRoutes}=require('./routes/cartRoutes')
const app=express();
app.use(express.json());
app.use(cors({
    origin:"*"
}))

app.get("/",(req,res)=>{
    res.send({msg:"Furniture Base Url here "});
})

app.get("/users",async(req,res)=>{
    let users=await UserModel.find();
    res.send(users);
})


app.post("/signup",async (req,res)=>{
    let {firstName,lastName,email,password}=req.body;
    bcrypt.hash(password,3,async function(err,hash){
        const user=new UserModel({
            firstName,
            lastName,
            email,
            password:hash
        });
        try{
            await user.save();
            res.send("SignUp Successfully");
        }
        catch(err){
            console.log(err);
            res.status(500).send("Something Went Wrong");
        }
    })
})


app.post("/login",async (req,res)=>{
    const {email,password}=req.body;
    const user=await UserModel.findOne({email});
    if(!user){
        res.send("Invalid Credentials Sign Up First");
    }
    else{
        const hashed_password=user.password;
        bcrypt.compare(password,hashed_password,function(err,result){
            if(result){
                    let token=jwt.sign({user_id:user._id},process.env.Secret_Key)
                    res.send({message:"login Successfull", token:token})
            }
            else{
                res.send("Invalid Credentials Login Failed");
            }
        })

    }
})


app.use("/furnitures",furnitureRoutes);

app.use("/cart",authentication,cartRoutes)

app.listen(5000,async ()=>{
    try{
        await connection;
        console.log("Database furniturebackend connected through Atlas");
    }
    catch(err){
        console.log("Error while connecting DataBase");
        console.log(err);
    }
    console.log("App is listening on port 5000");
})