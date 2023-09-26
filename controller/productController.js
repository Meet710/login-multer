const PRODUCT = require('../model/product')
const CATEGORY = require('../model/category')
const mongoose = require('mongoose')
const AddProduct =async(req, res ,next)=>{
    try {
      const {name, category , price , InStock} = req.body
      const findProduct = await PRODUCT.findOne({name :{ $regex: '^' + name + '$' } ,InStock:{$exists : true}})
      if ( findProduct ) return res.status(400).send("Product Already exists")

      const findCategory = await CATEGORY.findOne({name: category})
      if ( !findCategory) return res.status(404).send("Category not found")
    
      const product = new PRODUCT({
      name: name,
      category  : findCategory._id,
      photo : req.file.filename,  
      price    : price,
      InStock     : InStock
    })
    console.log(req.file.filename,"file")
    await product.save()
    res.status(200).json( {message:'Added Product Successfully'});
    } catch (error) {
        next(error)
    }
}

const editProduct = async(req, res , next) =>{
  try {
    const _id =req.params.id
    if(!mongoose.Types.ObjectId.isValid(_id))return res.status(501).send('Invalid ID');

    let  { name , category , photo ,price,InStock} = req.body

    const product = await PRODUCT.findOne({_id:_id})
    if(!product) return res.status(404).send('product not exists')

    const findCategory = await CATEGORY.findOne({name : category})
    if(!findCategory) return res.status(404).send("category not found")

    photo = req.file
    const update = {
      name,
      category : findCategory._id,
      photo,
      price,
      InStock
    }
    if (photo) update.photo =photo.filename
    const updateProduct  = await PRODUCT.findByIdAndUpdate(_id, { $set: update },{new: true})
    if(!updateProduct) {
      return  res.status(400).send("Error while updating product")
    }
    res.status(200).send("Product Updated")
  } catch (error) {
    next(error) 
  }
}
module.exports = { AddProduct , editProduct}
