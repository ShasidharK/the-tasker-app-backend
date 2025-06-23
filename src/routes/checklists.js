import { Router } from 'express'
import { getAllChecklists, createChecklist, updateChecklist, deleteChecklist } from '../controllers/checklists.js'
import auth from '../middleware/auth.js'

const router = Router()

router.get('/fetchChecklists', auth, getAllChecklists)
router.post('/', auth, createChecklist)
// router.get('/:id', auth, getChecklistById)
router.patch('/:id', auth, updateChecklist)
router.delete('/:id', auth, deleteChecklist)

export default router