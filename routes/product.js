const express = require('express')
const router = express.Router()
const  { AddProduct , editProduct } = require('../controller/productController')
const { upload } = require('../service/multer')

router.post('/AddProduct' , upload.single("photo") ,AddProduct)
router.patch('/editProduct/:id',upload.single("photo"),editProduct )
module.exports=router;