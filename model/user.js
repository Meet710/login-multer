const mongoose = require('mongoose')
const UserSchema =  new mongoose.Schema({
    FirstName   : { type : String , required :true, trim :true},
    LastName    : { type : String , required: true, trim :true},
    Photo       : { type : String },
    Email       : { type : String , unique : true, lowercase : true , trim :true},
    phoneNumber : { type : String , required :true},
    password    : { type : String , required : true}
})

module.exports = mongoose.model("user" , UserSchema)