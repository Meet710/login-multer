require('dotenv').config()
const Jwt= require('jsonwebtoken')
const USER= require('../model/user')
const bcrypt= require('bcrypt')


exports.registerUser= async(req ,res , next) =>{
    try {
     const findUser= await USER.findOne({Email : req.body.Email})
     if(findUser ) {
          return res.status(400).send({message :"User Already Registered"})
     }
     if(req.body.password=== req.body.confirmpassword){
     const hashPassword = await bcrypt.hash(req.body.password , 10)
     const user = new USER ({
        FirstName : req.body.FirstName,
        LastName : req.body.LastName,
        Photo: req.file.filename ,
        Email: req.body.Email,
        phoneNumber:req.body.phoneNumber,
        password:hashPassword
     })
     const data = await user.save()
     return res.status(200).send("User Registerd Sucessfully")
    }
    else {
        return res.status(200).send("password must be same")
    }
    } catch (error) {
        next(error)
    }
}


exports.login= async(req ,res , next) =>{
 try {
    const user = await USER.findOne({Email:req.body.Email})
    if(!user){
        return res.send("user not found")
    }
    const  isMatch = bcrypt.compareSync(req.body.password , user.password)
    if(!isMatch){
        return res.send("Invalid Password")
    }
    const payload = {
        id : user._id,
        Email: user.Email
    }
    const token = Jwt.sign(payload , process.env.SECRET_KEY)
    res.send(token)
 } catch (error) {
    next(error)
 }
}


exports.userProfile = async ( req ,res ,next) =>{
    try {
        const authtoken = req.headers['authorization']
        if( !authtoken){
            return res.status(400).send("No token Provided")
        }
        const token = authtoken.split(' ')[1]
        const decode = Jwt.verify(token , process.env.SECRET_KEY)
        if(!decode) return res.status(400).send("Invalid Token")
        const UserProfile= await USER.findOne({Email: decode.Email})
        res.send(UserProfile)
    } catch (error) {
        next(error)
    }
}