const Joi = require('joi')
const RegistrationValidation = (req, res ,next)=> {
    let validation = Joi.object({
        FirstName: Joi.string().alphanum().min(3).required(),
        LastName : Joi.string().min(3).required(),
        Email    : Joi.string().email().required(),
        PhoneNumber: Joi.string().required(),
        Password : Joi.string().pattern(new RegExp("^[a-zA-Z0-9@]{3,30}$")).required(),
        Confirmpassword: Joi.string().pattern(new RegExp("^[a-zA-Z0-9@]{3,30}$")).required(),
         
       })


    
    let IsValid= validation.validate(req.body)
    if (IsValid.error) {
       return res.status(422).json({message : IsValid.error.details[0].message})
    }
    next()

}

const LoginValidation = (req,res,next)=>{
    let validation= Joi.object ({
      Email : Joi.string().email().required(),
      Password : Joi.string().pattern(new RegExp("^[a-zA-Z0-9@]{3,30}$")).required(),
    })
   let IsValid = validation.validate(req.body)
   if(IsValid.error){
       res.status(422).json({message : IsValid.error.details[0].message})
    }
    next()
}


module.exports = {RegistrationValidation, LoginValidation}