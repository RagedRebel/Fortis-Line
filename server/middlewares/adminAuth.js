module.exports = function adminAuth(req, res, next) {
  try {
    if (req.session && req.session.adminId) return next()
    return res.status(401).json({ message: 'Unauthorized' })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}
