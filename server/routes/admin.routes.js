const express = require('express')
const Admin = require('../models/Admin')
const Complaint = require('../models/Complaints')
const adminAuth = require('../middlewares/adminAuth')

const router = express.Router()

// POST /admin/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' })
    }

    const admin = await Admin.findOne({ email })
    if (!admin || admin.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    req.session.adminId = admin._id.toString()
    res.json({ message: 'Logged in', admin: { email: admin.email } })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// POST /admin/logout
router.post('/logout', (req, res) => {
  try {
    if (req.session) {
      req.session.destroy(() => {
        res.clearCookie('connect.sid')
        console.log("Admin Logged out")
                return res.json({ message: 'Logged out' })
      })
    } else {
      res.json({ message: 'Logged out' })
    }
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// GET /admin/me
router.get('/me', (req, res) => {
  if (req.session && req.session.adminId) {
    return res.json({ authenticated: true })
  }
  return res.status(401).json({ authenticated: false })
})

// Protected: list complaints
router.get('/complaints', adminAuth, async (req, res) => {
  try {
    const complaints = await Complaint.find({})
    res.json(complaints)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Protected: complaint detail
router.get('/complaints/:id', adminAuth, async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id)
    if (!complaint) return res.status(404).json({ message: 'Not found' })
    res.json(complaint)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Protected: update complaint status
router.patch('/complaints/:id/status', adminAuth, async (req, res) => {
  try {
    const { status } = req.body
    const allowed = ['New', 'In Review', 'Resolved', 'Rejected']
    if (!allowed.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' })
    }

    const updated = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )
    if (!updated) return res.status(404).json({ message: 'Not found' })
    res.json(updated)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
