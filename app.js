require('dotenv').config()
const express = require('express')
const cookieParser = require("cookie-parser");
const bodyparser = require('body-parser')
const session = require("express-session")
const FileStore = require('session-file-store')(session)

const {ValidationError}= require('express-validation')
const connectDB = require('./config/database')
connectDB()
const user = require('./routes/user')
const category = require('./routes/category')
const product = require('./routes/product')
const app = express()
const port = process.env.PORT
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(express.json())
app.use(express.static('upload'))
app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
)
app.use("/",user)
app.use("/",category)
app.use("/", product)
app.use((error, req, res, next) => {
  console.error(error.message); // Log the error message
  res.status(500).send(error.message); // Respond with an error message to the client
});

app.listen(port, () => console.log(`Server Running on on port ${port}!`))