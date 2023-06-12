require('dotenv').config()
const express = require('express')
const bodyparser=require('body-parser')
const {ValidationError}= require('express-validation')
const connectDB = require('./config/database')
connectDB()
const user = require('./routes/user')
const app = express()
const port = process.env.PORT
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static('upload'))
app.use("/",user)
app.use(function(err, req, res, next){
  if (err instanceof ValidationError) {
      return res.status(err.statusCode).json(err)
    }
    return res.status(500).json(err)
  })

app.listen(port, () => console.log(`Server Running on on port ${port}!`))