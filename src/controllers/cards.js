import { Card, List, Board, Checklist } from '../models/index.js'

// Get all cards for a list
const getListCards = async (req, res) => {
  try {
    const { listId } = req.query
    // console.log("params : " + req.params);
    // console.log("query: " );
    // console.log(req.query);
    // Verify list belongs to user's board
    const list = await List.findByPk(listId, {      
        where: { id: listId, UserId: req.user.id }
    })
    
    if (!list) {
      return res.status(404).json({ error: 'List not found' })
    }
    
    const cards = await Card.findAll({
      where: { ListId: listId },
      order: [['position', 'ASC']],
      include: [{
        model: Checklist
      }]
    })
    
    res.json(cards)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Get a single card
const getCardById = async (req, res) => {
  try {
    const { id } = req.params
    
    const card = await Card.findByPk(id, {
      include: [{
        model: List,
        include: [{
          model: Board,
          where: { UserId: req.user.id }
        }]
      }, {
        model: Checklist
      }]
    })
    
    if (!card) {
      return res.status(404).json({ error: 'Card not found' })
    }
    
    res.json(card)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Create a new card
const createCard = async (req, res) => {
  try {
    const { listId } = req.body
    const { title, description, position, dueDate, labels } = req.body
    
    // Verify list belongs to user's board
    const list = await List.findByPk(listId, {
      include: [{
        model: Board,
        where: { UserId: req.user.id }
      }]
    })
    
    if (!list) {
      return res.status(404).json({ error: 'List not found' })
    }
    
    const card = await Card.create({
      ListId: listId,
      title,
      description,
      position,
      dueDate,
      labels,
      UserId: req.user.id
    })
    
    res.json(card)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Update a card
const updateCard = async (req, res) => {
  try {
    const { id } = req.params
    const { title, description, position, dueDate, labels } = req.body
    
    const card = await Card.findByPk(id, {
      include: [{
        model: List,
        include: [{
          model: Board,
          where: { UserId: req.user.id }
        }]
      }]
    })
    
    if (!card) {
      return res.status(404).json({ error: 'Card not found' })
    }
    
    // Verify card belongs to user's board
    const board = await Board.findByPk(card.List.BoardId, {
      where: { UserId: req.user.id }
    })
    
    if (!board) {
      return res.status(404).json({ error: 'Board not found' })
    }
    
    // Update card
    card.title = title || card.title
    card.description = description || card.description
    card.position = position || card.position
    card.dueDate = dueDate || card.dueDate
    card.labels = labels || card.labels
    await card.save()
    
    res.json(card)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const deleteCard = async (req, res) => {
try {
    const { id } = req.params
    
    const card = await Card.findByPk(id, {
      include: [{
        model: List,
        include: [{
          model: Board,
          where: { UserId: req.user.id }
        }]
      }]
    })
    
    if (!card) {
      return res.status(404).json({ error: 'Card not found' })
    }
    
    // Delete the card
    await card.destroy()
    
    res.json({ message: 'Card deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export { getCardById, getListCards, updateCard, createCard, deleteCard}