import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import userModel from '../models/UserModel'
import config from '../../config'
import { validateFields, handleValidationError } from './util/validator'

// Define authentication field definitions for validation
const AUTH_FIELD_DEFS = [
  { name: 'username', type: 'string', required: true },
  { name: 'password', type: 'string', required: true },
]

// Define method-specific field definitions
const METHOD_FIELD_DEFS = {
  POST: AUTH_FIELD_DEFS,
}

const registerUser = async (req, res) => {
  const newUserRecord = req.body
  try {
    // Validate user input against defined field definitions for POST method
    validateFields(newUserRecord, METHOD_FIELD_DEFS.POST)
    const { username, password } = newUserRecord

    // Hash the user's password and insert user record into the databse
    const hashedPassword = await bcrypt.hash(password, 10)
    const result = await userModel.insert({ username, password: hashedPassword })

    // Check if the user already exists (duplicate entry)
    if (result == null) {
      return res.status(409).json({ error: 'User already Exists' })
    }

    res.status(201).json({ message: 'User registered successfully' })
  } catch (err) {
    // Handle validation errors that occur and respond with 400 or 500
    handleValidationError(err, res)
  }
}

const loginUser = async (req, res) => {
  const userRecord = req.body
  try {
    // Validate user input against defined field definitions for POST method
    validateFields(userRecord, METHOD_FIELD_DEFS.POST)
    const { username, password } = userRecord

    const user = await userModel.getByUsername(username)

    if (user == null) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    // If the password is correct, generate a JWT token for authentication
    const isCorrectPassword = await bcrypt.compare(password, user.password)
    if (isCorrectPassword === true) {
      const token = jwt.sign({ userId: user.id }, config.jwtSecret, { expiresIn: '1h' })

      // Set the JWT token as a cookie and respond with a success message
      res.cookie('access_token', token, {})
      return res.json({ message: 'Login successful' })
    }

    res.status(401).json({ error: 'Invalid credentials' })
  } catch (err) {
    // Handle validation errors that occur and respond with 400 or 500
    handleValidationError(err, res)
  }
}

const authController = {
  registerUser,
  loginUser,
}

export default authController
