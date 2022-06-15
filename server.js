
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const bcrypt = require("bcrypt-nodejs")

const root = require('./routes/index')

// const uuid = require('uuid')
require('dotenv').config()

//Connections 
// const sequelize = require('./database')
const PORT =  5000 || process.env.PORT 
const app = express()

app.use('/v1/api', root)

//Routes
// const workers = require('./routes/workers')
// const tickets = require('./routes/tickets')
// const assets = require('./routes/assets')
// const wrapper = require('./routes/wrapper')


app.listen(PORT, function () {
    console.log(`Server running on http://localhost:${PORT}`)
}) 
