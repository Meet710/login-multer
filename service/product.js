const Joi = require('joi')
const mongoose = require('mongoose');

const validateProduct = (req, res, next) => {
  let payload = Joi.object({
    name: Joi.string().min(3).required().messages({
      'string.empty': 'Enter Product name...',
      'any.required': `Product name is a required field`,
      'string.min': 'Enter atleast 3 character in Product name',
    }),
    category: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
      'string.pattern.base': 'Category must be a valid ObjectID',
      'any.required': 'Category is required',
    }),

    price: Joi.number().min(5).required().messages({
      'number.empty': 'Enter price...',
      'any.required': `price is a required field`,
      'number.min': 'Enter aleast 5 price in product'
    }),
    InStock: Joi.boolean().required().messages({
      'boolean.base': 'InStock must be a boolean value',
      'any.required': 'InStock is a required field'
    })

  })

  let validation = payload.validate(req.body)
  if (validation.error) {
    return res.status(422).json({ message: validation.error.message })
  }
  next();

}
module.exports = { validateProduct }
