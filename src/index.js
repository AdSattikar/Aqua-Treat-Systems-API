const express = require('express')

require("./db/databaseConnection")

const customerRouter = require('./routes/customer')
const adminRouter = require('./routes/admin')
const loginRouter = require('./routes/login')

const app = express();
const port = process.env.PORT || 3000


app.get('/',(req,res) =>{
    res.send("tested get request")
})

app.use(express.json())

app.use(customerRouter)
app.use(adminRouter)
app.use(loginRouter)

app.listen(port, () => console.log(`Server running at port ${port}`));