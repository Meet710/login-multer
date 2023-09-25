 const express = require('express')
 const router = express.Router()
 const {AddCategory} = require('../controller/categoryController')
 
 router.post("/AddCategory",AddCategory)
 module.exports = router


