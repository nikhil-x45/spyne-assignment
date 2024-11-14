const User = require("../models/User");
//const {validateSignup}= require("../utils/validaton");
const bcrypt= require("bcrypt");

const jwt = require("jsonwebtoken"); 

exports.signup = async (req,res) => {
    // validation of the data 
    try{
      //validateSignup(req);
      
    const {password, Name, email}=req.body;
    // Encrypt the password and then store into DB
     
    const hashedPassword= await bcrypt.hash(password,10);

    console.log("hashed:", hashedPassword);
     const newUser=  new User({
       userName,Name,email,age,userType,
       password:hashedPassword,
     });
     await newUser.save();
     res.send( "user registered successfully");
   }
    catch(err){
     console.error("Error saving user:", err);
     res.send("not able to save user due to "+ err.msg);
   }
};

exports.login= async (req,res) => {
    // validate the incoming data
    try{ 
    const {email,password}=req.body;
    // check if email(user) is present in the db or not
    const user = await User.findOne({email:email});
    if(!user){
      throw new Error("Invalid Credentials!!");
    }
    //check the password is correct or not 
      const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
       throw new Error("Invalid Credentials!!")
    }
    else{
      const token = jwt.sign({ userId: user._id }, "hijek");
      console.log("token",token);
      res.cookie("token",token);
      res.send("Login Successful!!!");
    }
  }
    catch(err){
      res.status(400).send("error:"+err.message);
    }
};

exports.logout= async(req,res)=>{
     // user comes with a token to logout 
      res.cookie("token",null,{expires:new Date(Date.now())});
      res.send("Logged out!!"); 
};