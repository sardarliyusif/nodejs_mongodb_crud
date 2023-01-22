const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config()

const app = express()

app.use(cors())
app.use(bodyParser.json())

const PORT = process.env.PORT
const url = process.env.CONNECTION_URL.replace('<password>', process.env.PASSWORD)

mongoose.connect(url, (err) => {
    if(!err){
        console.log('DB connect');
        app.listen(PORT , () => {
            console.log('SERVER START');
        })
    }
})