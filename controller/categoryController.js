const CATEGORY = require('../model/category')

const AddCategory = async (req, res, next) => {
    try {
        const findCategory = await CATEGORY.findOne({ name: req.body.name })
        if (findCategory) return res.status(400).send({ message: 'This category already exist' });
        const category = new CATEGORY({
            name: req.body.name
        })
        await category.save()
        res.status(200).send("Category Sucessfully Added")

    } catch (error) {
        next(error)
    }

}

module.exports = { AddCategory }; 
