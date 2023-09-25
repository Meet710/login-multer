const express=require('express')
const router =express.Router()
const { validate }= require('express-validation')
const { RegistrationValidation, LoginValidation }=require('../service/uservalidation')
const { upload }= require('../service/multer')
const userController = require('../controller/userController')

router.post("/registration",upload.single("Photo"),RegistrationValidation,userController.registerUser)
router.post("/login",LoginValidation,userController.login)
router.post("/UserProfile", userController.userProfile)

module.exports=router



