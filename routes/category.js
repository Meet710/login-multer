 const express = require('express')
 const router = express.Router()
 const {AddCategory} = require('../controller/categoryController')
 
router.post('/addCategory' , AddCategory)
 module.exports =router


