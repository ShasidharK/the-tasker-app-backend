# The Tasker - Backend API

A RESTful API for The Tasker task management application built with Express.js and Sequelize ORM.

## Overview

This backend provides a complete API for The Tasker application, handling user authentication, boards, lists, cards, checklists, and check items. It uses Express.js as the web framework, Sequelize as the ORM, and PostgreSQL as the database.

## Features

- **User Authentication**: Register, login, and JWT-based authentication
- **Boards API**: CRUD operations for boards
- **Lists API**: CRUD operations for lists within boards
- **Cards API**: CRUD operations for cards within lists
- **Checklists API**: CRUD operations for checklists within cards
- **Check Items API**: CRUD operations for check items within checklists
- **Data Relationships**: Proper relationships between all entities
- **Authorization**: Users can only access their own data

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL
- npm or yarn

## Installation

1. Clone the repository (if not already done):
   ```bash
   git clone https://github.com/ShasidharK/the-tasker-app-backend.git
   cd todo_app/todo_backend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a PostgreSQL database for the application

4. Create a `.env` file in the root directory with the following content:
   ```
   PORT=3000
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=your_database_name
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   JWT_SECRET=your_jwt_secret_key
   ```
   Replace the placeholders with your actual database credentials and choose a secure random string for JWT_SECRET.

## Running the Application

1. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

2. The server will start on port 3000 (or the port specified in your .env file)

## Database Schema

The application uses the following data model:

- **User**: Represents a user of the application
- **Board**: Represents a board created by a user
- **List**: Represents a list within a board
- **Card**: Represents a card within a list
- **Checklist**: Represents a checklist within a card
- **ChecklistItem**: Represents an item within a checklist

Relationships:
- User has many Boards
- Board has many Lists
- List has many Cards
- Card has many Checklists
- Checklist has many ChecklistItems

## API Endpoints

### Authentication

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login a user
- `GET /api/auth/me`: Get current user information

### Boards

- `GET /api/boards/fetchBoards`: Get all boards for the authenticated user
- `POST /api/boards`: Create a new board
- `GET /api/boards/:id`: Get a specific board by ID
- `PATCH /api/boards/:id`: Update a board
- `DELETE /api/boards/:id`: Delete a board

### Lists

- `GET /api/lists/fetchLists`: Get all lists for a board
- `POST /api/lists`: Create a new list
- `PATCH /api/lists/:id`: Update a list
- `DELETE /api/lists/:id`: Delete a list

### Cards

- `GET /api/cards/fetchCards`: Get all cards for a list
- `POST /api/cards`: Create a new card
- `GET /api/cards/:id`: Get a specific card by ID
- `PATCH /api/cards/:id`: Update a card
- `DELETE /api/cards/:id`: Delete a card

### Checklists

- `GET /api/checklists/fetchChecklists`: Get all checklists for a card
- `POST /api/checklists`: Create a new checklist
- `PATCH /api/checklists/:id`: Update a checklist
- `DELETE /api/checklists/:id`: Delete a checklist

### Checklist Items

- `GET /api/checklist-items/fetchCheckitems`: Get all items for a checklist
- `POST /api/checklist-items`: Create a new checklist item
- `PATCH /api/checklist-items/:id`: Update a checklist item
- `DELETE /api/checklist-items/:id`: Delete a checklist item

## Authentication

All API endpoints (except for register and login) require authentication. To authenticate, include the JWT token in the Authorization header of your requests:

```
Authorization: Bearer your_jwt_token
```

## Project Structure

```
todo_backend/
├── src/
│   ├── config/
│   │   └── database.js     # Database configuration
│   ├── controllers/        # Request handlers
│   │   ├── auth.js         # Authentication controllers
│   │   ├── boards.js       # Boards controllers
│   │   ├── cards.js        # Cards controllers
│   │   ├── checklistItems.js # Checklist items controllers
│   │   ├── checklists.js   # Checklists controllers
│   │   └── lists.js        # Lists controllers
│   ├── middleware/
│   │   └── auth.js         # Authentication middleware
│   ├── models/             # Database models
│   │   ├── Board.js        # Board model
│   │   ├── Card.js         # Card model
│   │   ├── Checklist.js    # Checklist model
│   │   ├── ChecklistItem.js # Checklist item model
│   │   ├── List.js         # List model
│   │   ├── User.js         # User model
│   │   └── index.js        # Model relationships
│   ├── routes/             # API routes
│   │   ├── auth.js         # Authentication routes
│   │   ├── boards.js       # Boards routes
│   │   ├── cards.js        # Cards routes
│   │   ├── checklistItems.js # Checklist items routes
│   │   ├── checklists.js   # Checklists routes
│   │   └── lists.js        # Lists routes
│   └── index.js            # Application entry point
├── .env                    # Environment variables
├── .gitignore              # Git ignore file
├── package.json            # Project dependencies and scripts
└── README.md               # Project documentation
```

## Technologies Used

- **Express.js**: Web framework
- **Sequelize**: ORM for PostgreSQL
- **PostgreSQL**: Database
- **JSON Web Token (JWT)**: Authentication
- **bcryptjs**: Password hashing
- **cors**: Cross-Origin Resource Sharing
- **dotenv**: Environment variables

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- `200 OK`: Successful request
- `201 Created`: Resource created successfully
- `400 Bad Request`: Invalid request parameters
- `401 Unauthorized`: Authentication required or failed
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.