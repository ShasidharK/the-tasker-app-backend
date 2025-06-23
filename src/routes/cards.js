import { Router } from 'express'
import { getListCards, createCard, updateCard, deleteCard, getCardById } from '../controllers/cards.js'
import auth from '../middleware/auth.js'

const router = Router()

router.get('/fetchCards', auth, getListCards)
router.post('/', auth, createCard)
router.get('/:id', auth, getCardById)
router.patch('/:id', auth, updateCard)
router.delete('/:id', auth, deleteCard)

export default router