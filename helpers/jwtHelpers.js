const JWT = require('jsonwebtoken');
const createError = require('http-errors');

module.exports = {
  // 🔐 Sign Access Token
  signAccessToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {}; // You can include custom data if needed (e.g., role, email)
      const secret = process.env.ACCESS_TOKEN_SECRET;
      const options = {
        expiresIn: '10m',
        issuer: 'EddTechnologies.com',
        audience: userId,
      };

      JWT.sign(payload, secret, options, (error, token) => {
        if (error) {
          console.log(error.message);
          reject(createError.InternalServerError());
        } else {
          resolve(token);
        }
      });
    });
  },

  // 🔐 Verify Access Token (Middleware)
  verifyAccessToken: (req, res, next) => {
    try {
      const authHeader = req.headers['authorization'];
      if (!authHeader) return next(createError.Unauthorized());

      const bearerToken = authHeader.split(' ');
      if (bearerToken.length !== 2 || bearerToken[0] !== 'Bearer') {
        return next(createError.Unauthorized('Invalid token format'));
      }

      const token = bearerToken[1];
      JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err) {
          const message =
            err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
          return next(createError.Unauthorized(message));
        }

        req.payload = payload; // Attach decoded info to request


      })} catch (error) {} }}