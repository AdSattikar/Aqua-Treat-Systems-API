const express = require('express')

require("./db/databaseConnection")

const customerRouter = require('./routes/customer')

const app = express();
const port = process.env.PORT || 3000


app.get('/',(req,res) =>{
    res.send("tested get request")
})

app.use(express.json())

app.use(customerRouter)

app.listen(port, () => console.log(`Server running at port ${port}`));