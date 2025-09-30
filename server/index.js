const express =require("express");
const cors=require("cors");
const  bodyparser=require("body-parser")
require("dotenv").config();
const PORT = process.env.PORT;
const URL = process.env.URL

const db=require("./config/Dbconnection");
const client=require("./routes/client/ClientRoute")
const admin =require("./routes/admin/AdminRoute")

const app=express();
app.use(cors());
app.use(express.json());
app.use(bodyparser.json());

app.use("/",client)
app.use("/",admin)

db.connect((err)=>{
    if(err){
        console.log("Database connection failed",err)
    }else{
        console.log("Connected to MySQL Database");
        app.listen(PORT,()=>{
        console.log(`Server is running on : ${URL}`)
        })
    }
});