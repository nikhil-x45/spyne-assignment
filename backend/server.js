const express= require("express");
const app= express();

const connectDB=require("./src/config/database.js");
const cookie= require("cookie-parser");

require('dotenv').config();

app.use(express.json());
app.use(cookie());

connectDB()
  .then(()=>{
    console.log("database connection established!!")
    app.listen(3000, ()=>{
        console.log("server up hai aur daur rha");
    });
  })
 .catch(()=>{
    console.log("db connection failed");
 })