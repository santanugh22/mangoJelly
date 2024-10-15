# Comic Store Backend

## Description
This project is a backend API for managing the inventory of a comic book e-commerce store. It uses Node.js, Express, and PostgreSQL with Sequelize as the ORM.

## Installation

1. **Clone the Repository**
   
   ```bash
   git clone <repo_url>
   ```

2. **Install Dependencies**
   
   ```bash
   npm install
   ```
3. **Set Up Environment Variables**
   
   Create a `.env` file in the root directory of the project with the following content:
   
   ```env
   DATABASE_URL=your_postgresql_database_url_here
   PORT=3000
   ```

   Replace `your_postgresql_database_url_here` with your actual PostgreSQL database connection URL.

## Running the Server
  **Start the Server **
   
   ```bash
   npm start
   ```

## Endpoints

- **Create a Comic**: `POST /api/comics`
- **Get All Comics**: `GET /api/comics`
- **Get a Comic by ID**: `GET /api/comics/:id`
- **Update a Comic**: `PUT /api/comics/:id`
- **Delete a Comic**: `DELETE /api/comics/:id`


## Dependencies

- **express**: Creating API with Node.js
- **sequelize**: Promise-based ORM for SQL databases
- **pg**: PostgreSQL client for Node.js
- **pg-hstore**: Key-value store for PostgreSQL
- **dotenv**: Loads environment variables from a `.env` file
- **zod** Input validation library 



