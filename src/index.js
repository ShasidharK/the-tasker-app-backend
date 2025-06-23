import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import sequelize from './config/database.js'
import boardRoutes from './routes/boards.js'
import listRoutes from './routes/lists.js'
import cardRoutes from './routes/cards.js'
import checklistRoutes from './routes/checklists.js'
import checklistItemRoutes from './routes/checklistItems.js'
import authRoutes from './routes/auth.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/boards', boardRoutes)
app.use('/api/lists', listRoutes)
app.use('/api/cards', cardRoutes)
app.use('/api/checklists', checklistRoutes)
app.use('/api/checklist-items', checklistItemRoutes)

// Database sync and server start
sequelize.sync()
  .then(() => {
    console.log('Database connected successfully')
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    })
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error)
  })