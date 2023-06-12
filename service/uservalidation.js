const Joi = require('joi')
const RegistrationValidation =  {
    body : Joi.object({
        FirstName: Joi.string().min(3).required(),
        LastName : Joi.string().min(3).required(),
        Email    : Joi.string().email().required(),
        phoneNumber: Joi.string().required(),
        password : Joi.string().pattern(new RegExp("^[a-zA-Z0-9@]{3,30}$")).required(),
        confirmpassword: Joi.string().pattern(new RegExp("^[a-zA-Z0-9@]{3,30}$")).required()
    })
}

const LoginValidation = {
    body : Joi.object ({
      Email : Joi.string().email().required(),
      password : Joi.string().pattern(new RegExp("^[a-zA-Z0-9@]{3,30}$")).required(),
    })
}


module.exports = {RegistrationValidation, LoginValidation}