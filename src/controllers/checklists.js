import { Checklist, Card, ChecklistItem } from '../models/index.js'

const getAllChecklists = async (req, res) => {
  try {
    const checklists = await Checklist.findAll({
      where: { CardId: req.query.cardId },
      include: [ChecklistItem]
    })
    res.json(checklists)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getChecklistById = async (req, res) => {
  try {
    const checklist = await Checklist.findByPk(req.params.id, {
      include: [ChecklistItem]
    })
    if (!checklist) return res.status(404).json({ error: 'Checklist not found' })
    res.json(checklist)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}


const createChecklist = async (req, res) => {
  try {
    const { title, cardId } = req.body
    const checklist = await Checklist.create({ title, CardId: cardId })
    res.status(201).json(checklist)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const updateChecklist = async (req, res) => {
  try {
    const { title } = req.body
    const checklist = await Checklist.findByPk(req.params.id)
    if (!checklist) return res.status(404).json({ error: 'Checklist not found' })
    checklist.title = title
    await checklist.save()
    res.json(checklist)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const deleteChecklist = async (req, res) => {
  try {
    const checklist = await Checklist.findByPk(req.params.id)
    if (!checklist) return res.status(404).json({ error: 'Checklist not found' })
    await checklist.destroy()
    res.json({ message: 'Checklist deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export { getAllChecklists,getChecklistById, updateChecklist, createChecklist, deleteChecklist}