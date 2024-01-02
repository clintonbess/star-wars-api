import BaseModel from './BaseModel'

const TABLE_NAME = 'vehicles'

class VehiclesModel extends BaseModel {
  constructor() {
    super(TABLE_NAME)
  }

  async vehicleExists(vehicleName) {
    try {
      const checkQuery = 'SELECT * FROM vehicles WHERE vehicle_name = $1'
      const checkResult = await this.db.query(checkQuery, [vehicleName])
      return checkResult.rows.length > 0
    } catch (err) {
      throw err
    }
  }
}

export default new VehiclesModel()
