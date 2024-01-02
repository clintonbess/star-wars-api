import db from '../db'

// Base model class for common CRUD operations
class BaseModel {
  constructor(tableName) {
    this.tableName = tableName
    this.db = db
  }

  // Method for retrieving all records from a table
  async getAll() {
    try {
      const query = `SELECT * FROM ${this.tableName} WHERE deleted = FALSE`
      const result = await db.query(query)
      return result.rows
    } catch (err) {
      throw err
    }
  }

  // Method to retrieve a record by ID
  async getById(id) {
    try {
      const query = `SELECT * FROM ${this.tableName} WHERE id = $1 AND deleted = FALSE`
      const result = await db.query(query, [id])
      return result.rows[0]
    } catch (err) {
      throw err
    }
  }

  // Method to insert a new record into the table
  async insert(tableData) {
    try {
      const columns = Object.keys(tableData).join(', ')
      const values = Object.values(tableData)
      const placeholders = Object.keys(tableData)
        .map((ignoredData, index) => `$${index + 1}`)
        .join(', ')

      const insertQuery = `
        INSERT INTO ${this.tableName} (${columns})
        VALUES (${placeholders})
        RETURNING *;
      `
      const insertResult = await this.db.query(insertQuery, values)
      return insertResult.rows[0]
    } catch (err) {
      throw err
    }
  }

  // Method to update a record by ID in the table
  async updateById(id, updatedData) {
    try {
      const fields = Object.keys(updatedData)
      const values = Object.values(updatedData)
      const setStatements = fields.map((field, index) => `${field} = $${index + 2}`).join(', ')

      const query = `
        UPDATE ${this.tableName}
        SET ${setStatements}
        WHERE id = $1
        RETURNING *;
      `

      const result = await this.db.query(query, [id, ...values])
      // Return null to indicate no update was made
      if (result.rows.length === 0) {
        return null
      }

      return result.rows[0]
    } catch (err) {
      throw err
    }
  }

  async deleteById(id) {
    try {
      const softDeleteQuery = `
        UPDATE ${this.tableName}
        SET deleted = TRUE
        WHERE id = $1
        RETURNING *;
      `

      const result = await this.db.query(softDeleteQuery, [id])

      // Return null if the record with the specified ID doesn't exist
      if (result.rows.length === 0) {
        return null
      }

      return result.rows[0]
    } catch (err) {
      throw err
    }
  }
}

export default BaseModel
