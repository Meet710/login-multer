require('dotenv').config()
const Jwt = require('jsonwebtoken')
const USER = require('../model/user')
const ROLE= require("../model/role")
const bcrypt = require('bcrypt')


exports.registerUser = async (req, res, next) => {
    try {
        const findUser = await USER.findOne({ Email: req.body.Email })
        if (findUser) {
            return res.status(400).send({ message: "User Already Registered" })
        }
        if (req.body.Password === req.body.Confirmpassword) {
            const hashPassword = await bcrypt.hash(req.body.Password, 10)
            const defaultRole = await ROLE.findOne({ role: "user" })
            if(!defaultRole) return res.status(404).send("no role found")
            const user = new USER({
                FirstName: req.body.FirstName,
                LastName: req.body.LastName,
                Photo: req.file.filename,
                Role: defaultRole._id,
                Email: req.body.Email,
                PhoneNumber: req.body.PhoneNumber,
                Password: hashPassword
            })
            const data = await user.save()
            return res.status(200).send({data :data})
        }
        else {
            return res.status(200).send("password must be same")
        }
    } catch (error) {
        next(error)
    }
}


exports.login = async (req, res, next) => {
    try {
        const user = await USER.findOne({ Email: req.body.Email })
        if (!user) {
            return res.send("user not found")
        }
        const isMatch = bcrypt.compareSync(req.body.Password, user.Password)
        if (!isMatch) {
            return res.send("Invalid Password")
        }
        const payload = {
            id: user._id,
        }
        const token= Jwt.sign(payload ,process.env.SECRET_KEY)
        res.cookie('jwt',token,{httpOnly: true , secure: true})
        res.status(200).send(token)
    } catch (error) {
        next(error)
    }
}

exports.userProfile = async (req, res, next) => {
    try {
        const authtoken = req.headers['authorization']
        if (!authtoken) {
            return res.status(400).send("No token Provided")
        }
        const token = authtoken.split(' ')[1]
        const decode = Jwt.si(token, process.env.SECRET_KEY)
        if (!decode) return res.status(400).send("Invalid Token")
        const UserProfile = await USER.findOne({ Email: decode.Email })
        res.send(UserProfile)
    } catch (error) {
        next(error)
    }
}
exports.getAll = async (req, res, next) => { 
    try {
        const records = await USER.find({}).populate({ path: "Role", model: 'role', select: 'role' })
        if (!records) return res.status(404).send("No records found")
         res.status(200).send({records : records})
        
    } catch (error) {
        next(error)
    }
}