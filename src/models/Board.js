import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

const Board = sequelize.define('Board', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  backgroundColor: {
    type: DataTypes.STRING,
    defaultValue: '#0079BF' // Default Trello blue
  }
})

export default Board