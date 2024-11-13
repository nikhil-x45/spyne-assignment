const express= require("express");
const app= express();

const connectDB=require("./src/config/database.js");
const cookie= require("cookie-parser");

require('dotenv').config();

app.use(express.json());
app.use(cookie());

// documentation of apis
app.get('/api/docs', (req, res) => {
    res.redirect('https://documenter.getpostman.com/view/34580773/2sAY55ZxLj');
});

app.use("/api/auth", require("./src/routes/auth"));
app.use("/api", require("./src/routes/car"));


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