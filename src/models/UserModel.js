import BaseModel from './BaseModel'

const TABLE_NAME = 'users'

export class UserModel extends BaseModel {
  constructor() {
    super(TABLE_NAME)
  }

  async insert(userData) {
    try {
      const columns = Object.keys(userData).join(', ')
      const values = Object.values(userData)
      const placeholders = Object.keys(userData)
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
      if (err.constraint === 'users_username_unique') {
        return null
      }
      throw err
    }
  }

  async getByUsername(username) {
    try {
      const query = 'SELECT * FROM users WHERE username = $1'
      const result = await this.db.query(query, [username])
      return result.rows[0]
    } catch (err) {
      throw err
    }
  }
}

export default new UserModel()
