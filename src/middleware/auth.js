import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const auth = (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return res.status(401).json({ error: 'No token, authorization denied' })
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    // Add user from payload
    req.user = decoded

    next()
  } catch (error) {
    res.status(401).json({ error: 'Token is not valid' })
  }
}

export default auth