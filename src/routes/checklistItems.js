import { Router } from 'express'
import { getAllChecklistItems, createChecklistItem, updateChecklistItem, deleteChecklistItem } from '../controllers/checklistItems.js'
import auth from '../middleware/auth.js'

const router = Router()

router.get('/fetchChecklistItems', auth, getAllChecklistItems)
router.post('/', auth, createChecklistItem)
router.patch('/:id', auth, updateChecklistItem)
router.delete('/:id', auth, deleteChecklistItem)

export default router