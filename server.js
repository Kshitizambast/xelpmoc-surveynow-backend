
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const bcrypt = require("bcrypt-nodejs")

const root = require('./routes/index')

// const uuid = require('uuid')
require('dotenv').config()


const PORT =  5001 || process.env.PORT 
const app = express()

app.use('/v1/api', root)

app.listen(PORT, function () {
    console.log(`Server running on http://localhost:${PORT}`)
}) 
