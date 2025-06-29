import { Router } from 'express'
import { register, login, getCurrentUser } from '../controllers/auth.js'
import auth from '../middleware/auth.js'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.get('/me', auth, getCurrentUser)

export default router