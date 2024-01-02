import config from '../../config'
import jwt from 'jsonwebtoken'

const verifyToken = (req, res, next) => {
  // Extract the access token from the request cookies
  const token = req.cookies.access_token
  // Check if the token is not provided
  if (token == null) {
    return res.status(403).json({ error: 'Token not provided' })
  }
  // Verify the token using the configured JWT secret
  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      console.error(err)
      return res.status(401).json({ error: 'Failed to authenticate token' })
    }
    // Include user ID in the request object for future use
    req.userId = decoded.userId
    next()
  })
}

export default verifyToken
