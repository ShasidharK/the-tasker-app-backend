import { Router } from 'express'
import { getBoardLists, createList, updateList, deleteList } from '../controllers/lists.js'
import auth from '../middleware/auth.js'

const router = Router()

router.get('/fetchLists', auth, getBoardLists)
router.post('/', auth, createList)
router.patch('/:id', auth, updateList)
router.delete('/:id', auth, deleteList)

export default router