const mongoose= require("mongoose");

const userSchema= mongoose.Schema({
    
    email:{
        type:String,
        unique:true,
        required: [true, 'Email is required'],
        lowercase: true,
        trim: true,
    },
    password:{
        type:String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters']
    }, 
    Name:{
        type:String,
        required: [true, 'Name is required'],
        trim:true,
    },
},{timestamps:true})

const User= mongoose.model("User",userSchema);

module.exports= User;