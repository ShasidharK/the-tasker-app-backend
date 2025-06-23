import User from './User.js'
import Board from './Board.js'
import List from './List.js'
import Card from './Card.js'
import Checklist from './Checklist.js'
import ChecklistItem from './ChecklistItem.js'

// User - Board (One-to-Many)
User.hasMany(Board, { onDelete: 'CASCADE' })
Board.belongsTo(User)

// Board - List (One-to-Many)
Board.hasMany(List, { onDelete: 'CASCADE' })
List.belongsTo(Board)

// List - Card (One-to-Many)
List.hasMany(Card, { onDelete: 'CASCADE' })
Card.belongsTo(List)

// Card - Checklist (One-to-Many)
Card.hasMany(Checklist, { onDelete: 'CASCADE' })
Checklist.belongsTo(Card)

// Checklist - ChecklistItem (One-to-Many)
Checklist.hasMany(ChecklistItem, { onDelete: 'CASCADE' })
ChecklistItem.belongsTo(Checklist)

export { User, Board, List, Card, Checklist, ChecklistItem }