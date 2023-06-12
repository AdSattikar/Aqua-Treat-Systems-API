const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://AdnanSattikar:Adsattikar111@aquatreat.nsnbm1e.mongodb.net/aquatreat",{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log("Connection Successful")
})
.catch((e) =>{
    console.log("Connection error "+e)
})