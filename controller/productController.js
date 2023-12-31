const PRODUCT = require("../model/product");
const CATEGORY = require("../model/category");
const mongoose = require("mongoose");
const category = require("../model/category");
const ObjectId = mongoose.Types.ObjectId

const AddProduct = async (req, res, next) => {
  try {
    const { name, category, price, InStock, categoryid } = req.body;
    const findProduct = await PRODUCT.findOne({
      name: { $regex: "^" + name + "$" },
      InStock: { $exists: true },
    });
    if (findProduct) return res.status(400).send("Product Already exists");
    const categoryObjectId = new ObjectId(category);
    console.log(mongoose.Types.ObjectId.isValid(categoryObjectId))
    const findCategory = await CATEGORY.findOne({ _id: categoryObjectId });
    console.log(findCategory)
    if (!findCategory) return res.status(404).send("Category not found");

    const product = new PRODUCT({
      name: name,
      category: { categoryid: findCategory._id, categoryname: findCategory.name },
      photo: { filename: req.file.originalname, mimetype: req.file.mimetype, size: req.file.size, },
      price: price,
      InStock: InStock,
    });
    console.log(req.file.filename, "file");
    await product.save();
    res.status(200).json({ message: "Added Product Successfully" });
  } catch (error) {
    next(error);
  }
};

const showProduct = async (req, res, next) => {
  try {
    const category = await CATEGORY.find({})
    let data = JSON.stringify(category)
    console.log(data)

    const product = await PRODUCT.aggregate([
      {
        $match: {

        }
      },
    ])
    if (!product) return res.status(404).send("products not found");

    return res.status(200).json({ Products: product });
  } catch (error) {
    next(error);
  }
};
const editProduct = async (req, res, next) => {
  try {
    const _id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(501).send("Invalid ID");

    let { name, category, photo, price, InStock } = req.body;

    const product = await PRODUCT.findOne({ _id: _id });
    if (!product) return res.status(404).send("product not exists");

    photo = req.file;
    const update = {
      name,
      category,
      photo,
      price,
      InStock,
    };
    if (photo) update.photo = photo.filename;
    if (category) {
      const findCategory = await CATEGORY.findOne({ name: category });
      if (!findCategory) return res.status(404).send("category not found");
      update.category = findCategory._id;
    }
    const updateProduct = await PRODUCT.findByIdAndUpdate(
      _id,
      { $set: update },
      { new: true }
    );
    if (!updateProduct) {
      return res.status(400).send("Error while updating product");
    }
    res.status(200).send(updateProduct);
  } catch (error) {
    next(error);
  }
};
const showByID = async (req, res, next) => {
  try {
    const _id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(501).send("Invalid ID or ID not Provided");
    const product = await PRODUCT.findOne({ _id: _id });
    if (!product) return res;
  } catch (error) {
    next(error)

  }
};
module.exports = { AddProduct, editProduct, showProduct, showByID };

