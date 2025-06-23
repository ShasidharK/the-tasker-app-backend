import { ChecklistItem, Checklist } from '../models/index.js'

const getAllChecklistItems = async (req, res) => {
  try {
    const items = await ChecklistItem.findAll({
      where: { ChecklistId: req.query.checklistId }
    })
    res.json(items)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const createChecklistItem = async (req, res) => {
  try {
    const { text, checklistId, completed } = req.body
    console.log(req.body);
    const item = await ChecklistItem.create({ text, ChecklistId: checklistId, completed: !!completed })
    res.status(201).json(item)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const updateChecklistItem = async (req, res) => {
  try {
    const { text, completed } = req.body
    const item = await ChecklistItem.findByPk(req.params.id)
    if (!item) return res.status(404).json({ error: 'Checklist item not found' })
    if (text !== undefined) item.text = text
    if (completed !== undefined) item.completed = completed
    await item.save()
    res.json(item)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const deleteChecklistItem = async (req, res) => {
  try {
    const item = await ChecklistItem.findByPk(req.params.id)
    if (!item) return res.status(404).json({ error: 'Checklist item not found' })
    await item.destroy()
    res.json({ message: 'Checklist item deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export { getAllChecklistItems, createChecklistItem, updateChecklistItem, deleteChecklistItem}