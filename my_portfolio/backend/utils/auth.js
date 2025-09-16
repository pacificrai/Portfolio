function requireAdmin(req, res, next) {
  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
  const expected = process.env.ADMIN_TOKEN || 'admin123';
  if (token && token === expected) return next();
  return res.status(401).json({ error: 'Unauthorized' });
}

module.exports = { requireAdmin };


