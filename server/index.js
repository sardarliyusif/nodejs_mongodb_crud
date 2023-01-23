const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config()

const { Schema } = mongoose

const userSchema = new Schema({
    fullName: { type: String, required: true },
    userName: { type: String, required: true },
    age: { type: Number, required: true },
    imgUrl: { type: String, required: true },
},
    { timestamps: true }
)

const Users = mongoose.model('users', userSchema)

const app = express()

app.use(cors())
app.use(bodyParser.json())


app.get('/', (req, res) => {
    res.send('<h1>SALAM YUSIF</h1>')
})


// GET ALL USERS
app.get('/users', (req, res) => {
    Users.find({}, (err, docs) => {
        if (!err) {
            res.send(docs)
        } else {
            res.status(404).json({ message: err })
        }
    })
})

// GET USER BY ID
app.get('/users/:id', (req, res) => {
    const { id } = req.params 
    Users.findById(id, (err , doc) => {
        if(!err){
            if(doc){
                res.send(doc)
            }else{
                res.status(404).json({message: 'Bele adam yoxdu a kisi'})
            }
        }else(
            res.status(404).json({message:err})
        )
    })
})

// DELETE USER

app.delete('/users/:id',(req,res) => {
    const {id} = req.params
    Users.findByIdAndDelete(id,(err) => {
        if(!err){
            res.send('User silindi')
        }else{
            res.status(404).json({message:err})
        }
    })
})

// ADD USER 

app.post('/users',(req,res) => {
    const user = new Users({
        fullName: req.body.fullName,
        userName:req.body.userName,
        age:req.body.age,
        imgUrl:req.body.imgUrl
    })
    user.save()
    res.send({message: 'User created'})
})

const PORT = process.env.PORT
const url = process.env.CONNECTION_URL.replace('<password>', process.env.PASSWORD)

mongoose.set('strictQuery', true);
mongoose.connect(url, (err) => {
    if (!err) {
        console.log('DB connect');
        app.listen(PORT, () => {
            console.log('SERVER START');
        })
    }
})