const mongoose= require("mongoose");

const connectDB= async()=> {
     await mongoose.connect("mongodb+srv://nr438767:nikhil1234@cluster0.n9k5y.mongodb.net/Spyne")
};

module.exports=connectDB;
 