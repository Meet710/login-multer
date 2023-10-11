const { ObjectId } = require('mongodb')
const ROLE = require('../model/role')
const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    FirstName: { type: String, required: true, trim: true },
    LastName: { type: String, required: true, trim: true },
    Email: { type: String, required: true, unique:true},
    Photo: { type: String },
    Role: [{ type: ObjectId,ref:'role'}],
    PhoneNumber: { type: String, required: true },
    Password: { type: String, required: true }
})




module.exports = mongoose.model("user", UserSchema)