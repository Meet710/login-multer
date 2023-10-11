
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const RoleSchema = new mongoose.Schema({
    role: { type: String , required: true}
})
module.exports = mongoose.model('role', RoleSchema)
