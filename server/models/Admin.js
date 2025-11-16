const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true }
}, { timestamps: true })

const AdminModel = mongoose.model('admins', AdminSchema)
module.exports = AdminModel
