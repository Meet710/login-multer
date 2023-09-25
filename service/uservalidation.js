const Joi = require('joi')
const RegistrationValidation = (req, res ,next)=> {
    let validation = Joi.object({
        FirstName: Joi.string().alphanum().min(3).required(),
        LastName : Joi.string().min(3).required(),
        Email    : Joi.string().email().required(),
        phoneNumber: Joi.string().required(),
        password : Joi.string().pattern(new RegExp("^[a-zA-Z0-9@]{3,30}$")).required(),
<<<<<<< HEAD
        confirmpassword: Joi.string().pattern(new RegExp("^[a-zA-Z0-9@]{3,30}$")).required(),
        Gender: Joi.string().valid('male','female').insensitive().required(), 
       })
=======
        confirmpassword: Joi.string().pattern(new RegExp("^[a-zA-Z0-9@]{3,30}$")).required()
    })
    let IsValid= validation.validate(req.body)
    if (IsValid.error) {
       return res.status(422).json({message : IsValid.error.details[0].message})
    }
    next()
>>>>>>> 13e6a20c784f70f2170014660c2d68c8ea551018
}

const LoginValidation = (req,res,next)=>{
    let validation= Joi.object ({
      Email : Joi.string().email().required(),
      password : Joi.string().pattern(new RegExp("^[a-zA-Z0-9@]{3,30}$")).required(),
    })
   let IsValid = validation.validate(req.body)
   if(IsValid.error){
       res.status(422).json({message : IsValid.error.details[0].message})
   }
}


module.exports = {RegistrationValidation, LoginValidation}