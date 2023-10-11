require('dotenv').config()
const Jwt = require("jsonwebtoken");
const USER = require("../model/user");
const ROLE = require("../model/role");
const role = require('../model/role');

const isAuth =(roles=[])=> async (req, res, next) => {
  
    try {
        const authToken = req.cookies.jwt;
        console.log(authToken ,'authtoken')
        if(!authToken) return res.status(401).send("something wrong! try again")
        
        const decode =  Jwt.verify(authToken, process.env.SECRET_KEY )
        if (!decode) return res.status(401).send("invalid token")
       
        if (!roles.length) return res.status(401).send("unauthorized");

        const user = await USER.findOne({ _id: decode.id });
 
        if (!user) return res.status(404).send('user not found')
       
        const userRole = await ROLE.findOne({ _id: user.Role })
        
        if (roles.includes(userRole.role)) {
            req.user = user
            return next()
        }
        else {
            return res.status(400).send("unauthorized")
        }
    }
    catch (error) {
        next(error)
    }

};
module.exports = { isAuth }
