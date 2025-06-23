import { Board, List } from '../models/index.js'

// Get all boards for a user
const getUserBoards = async (req, res) => {
  try {
    const boards = await Board.findAll({
      where: { UserId: req.user.id },
      order: [['createdAt', 'DESC']]
    })
    res.json(boards)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
// Get a single board with its lists
const getBoardById = async (req, res) => {
  try {
    const board = await Board.findOne({
      where: { id: req.params.id, UserId: req.user.id },
      include: [{
        model: List,
        order: [['position', 'ASC']]
      }]
    })
    
    if (!board) {
      return res.status(404).json({ error: 'Board not found' })
    }
    
    res.json(board)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Create a new board
const createBoard = async (req, res) => {
  try {
    const { title, description, backgroundColor } = req.body
    
    const board = await Board.create({
      title,
      description,
      backgroundColor,
      UserId: req.user.id
    })
    
    res.status(201).json(board)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Update a board
const updateBoard = async (req, res) => {
  try {
    const { title, description, backgroundColor } = req.body
    
    const board = await Board.findOne({
      where: { id: req.params.id, UserId: req.user.id }
    })
    
    if (!board) {
      return res.status(404).json({ error: 'Board not found' })
    }
    
    board.title = title || board.title
    board.description = description !== undefined ? description : board.description
    board.backgroundColor = backgroundColor || board.backgroundColor
    
    await board.save()
    
    res.json(board)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Delete a board
const deleteBoard = async (req, res) => {
  try {
    const board = await Board.findOne({
      where: { id: req.params.id, UserId: req.user.id }
    })
    
    if (!board) {
      return res.status(404).json({ error: 'Board not found' })
    }
    
    await board.destroy()
    
    res.status(204).send()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
export {getUserBoards, getBoardById, createBoard, updateBoard, deleteBoard};