import express from 'express'
import authController from './controllers/auth-controller'
import routes from './routes'
import cookieParser from 'cookie-parser'
const app = express()
// Middleware setup
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
// Setting up routes for user registration and login
app.post('/register', authController.registerUser)
app.post('/login', authController.loginUser)
// Setting up API routes using the provided routes module
app.use('/api', routes)

export default app
