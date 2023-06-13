const mongoose = require("mongoose")
require('dotenv').config();

mongoose.connect(process.env.DATABASEURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log("Connection Successful")
})
.catch((e) =>{
    console.log("Connection error "+e)
})