const mongoose = require('mongoose')
const Admin = require('../models/Admin')
require('dotenv').config()

async function main() {
  const url = process.env.MONGO_URL || 'mongodb://localhost:27017/FortisLine'
  await mongoose.connect(url)
  const email = process.env.SEED_ADMIN_EMAIL || 'admin@fortisline.com'
  const password = process.env.SEED_ADMIN_PASSWORD || 'admin123'
  const exists = await Admin.findOne({ email })
  if (exists) {
    console.log('Admin already exists:', email)
  } else {
    await Admin.create({ email, password })
    console.log('Created admin:', email)
  }
  await mongoose.disconnect()
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
