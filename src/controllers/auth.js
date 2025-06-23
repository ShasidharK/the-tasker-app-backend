import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from '../models/index.js'
import dotenv from 'dotenv'
// Register a new user
export const register = async (req, res) => {
  console.log("This is backend register async call")
  try {
    const { username, email, password } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } })
    if (existingUser) {
      console.log("User Exists")
      return res.status(400).json({ error: 'User already exists' })
    }
    console.log("hashing password...")
    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    console.log("Creating User...")
    // Create user
    const user = await User.create({
      username,
      email,
      password: hashedPassword
    })
    console.log("generating token for " + username + " " + email + " ")
    // Create JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )
    console.log(" Token generated ");
    res.status(201).json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: error.message })
  }
}

// Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body
   
    // Check if user exists
    const user = await User.findOne({ where: { email } })
    if (!user) {
      console.log("credentials Invalid")
      return res.status(400).json({ error: 'Invalid credentials' })
    }
    console.log("Checking password match")
    // Check password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      console.log("password not matched")
      return res.status(400).json({ error: 'Invalid credentials' })
    }
    console.log("Signing token")
    dotenv.config()
    // Create JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )
   
    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    })
  } catch (error) {
    
    res.status(500).json({ error: error.message })
  }
}

// Get current user
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    })
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}