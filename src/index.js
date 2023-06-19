const express = require('express')

require("./db/databaseConnection")

const cors = require('cors')

const customerRouter = require('./routes/customer')
const adminRouter = require('./routes/admin')
const loginRouter = require('./routes/login')
const messageRouter = require('./routes/message')
const app = express();

const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors())

//Routers
app.use(customerRouter)
app.use(adminRouter)
app.use(loginRouter)
app.use(messageRouter)

//Server Running 
app.listen(port, () => console.log(`Server running at port ${port}`));