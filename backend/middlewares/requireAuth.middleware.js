const logger = require('../services/logger.service')

async function requireAuth(req, res, next) {
  if (!req.session || !req.session.user) {
    res.status(401).end('Unauthorized requireAuth');
    return;
  }
  next();
}

module.exports = requireAuth
