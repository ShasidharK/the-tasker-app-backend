import { List, Board, Card } from '../models/index.js'

// Get all lists for a board
const getBoardLists = async (req, res) => {
  try {
    const { boardId } = req.query
    // Verify board belongs to user
    const board = await Board.findOne({
      where: { id: boardId, UserId: req.user.id }
    })
    
    if (!board) {
      console.log("Board not found")
      return res.status(404).json({ error: 'Board not found' })
    }
    const lists = await List.findAll({
      where: { BoardId: boardId },
      order: [['position', 'ASC']],
      include: [{
        model: Card,
        order: [['position', 'ASC']]
      }]
    })
    
    res.json(lists)
  } catch (error) { 
    console.log("Error : " + error )
    res.status(500).json({ error: error.message })
  }
}

// Create a new list
const createList = async (req, res) => {
  try {
    const { boardId } = req.body
    console.log(req)
    console.log("Board ID is "+ boardId)
    const { title, position } = req.body

    // Verify board belongs to user
    const board = await Board.findOne({
      where: { id: boardId, UserId: req.user.id }
    })
    
    if (!board) {
      console.log("Board not Found")
      return res.status(404).json({ error: 'Board not found' })
    }
    console.log(board);
    
    // Get max position if not provided
    let listPosition = position
    if (listPosition === undefined) {
      const maxPositionList = await List.findOne({
        where: { BoardId: boardId },
        order: [['position', 'DESC']]
      })
      listPosition = maxPositionList ? maxPositionList.position + 1 : 0
    }
    
    const list = await List.create({
      title,
      position: listPosition,
      BoardId: boardId
    })
    
    res.status(201).json(list)
  } catch (error) {
    console.log("Error : " + error.message);
    res.status(400).json({ error: error.message })
  }
}

// Update a list
const updateList = async (req, res) => {
  try {
    const { id } = req.params
    const { title, position } = req.body
    
    const list = await List.findByPk(id, {
      include: [{
        model: Board,
        where: { UserId: req.user.id }
      }]
    })
    
    if (!list) {
      return res.status(404).json({ error: 'List not found' })
    }
    
    list.title = title || list.title
    if (position !== undefined) list.position = position
    
    await list.save()
    
    res.json(list)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Delete a list
const deleteList = async (req, res) => {
  try {
    const { id } = req.params
    
    const list = await List.findByPk(id, {
      include: [{
        model: Board,
        where: { UserId: req.user.id }
      }]
    })
    
    if (!list) {
      return res.status(404).json({ error: 'List not found' })
    }
    
    await list.destroy()
    
    res.status(204).send()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export { getBoardLists, createList, updateList, deleteList}