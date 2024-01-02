import { Pool } from 'pg'
import { production } from '../../config'

class Database {
  // Initialize a new instance of the Pool with provided config
  constructor() {
    this.pool = new Pool(production.db)
  }

  // Method to execute a SQL query using the connection pool
  query(text, params) {
    return this.pool.query(text, params)
  }

  // Method to close the connection pool
  close() {
    return this.pool.end()
  }
}

// Create a singleton instance of the Database class to be exported
export default new Database()
