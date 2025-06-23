import { Router } from 'express'
import { getUserBoards, getBoardById, createBoard, updateBoard, deleteBoard } from '../controllers/boards.js'
import auth from '../middleware/auth.js'

const router = Router()

router.get('/fetchBoards', auth, getUserBoards)
router.post('/', auth, createBoard)
router.get('/:id', auth, getBoardById)
router.patch('/:id', auth, updateBoard)
router.delete('/:id', auth, deleteBoard)

export default router