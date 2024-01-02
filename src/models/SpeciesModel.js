import BaseModel from './BaseModel'

const TABLE_NAME = 'species'

class SpeciesModel extends BaseModel {
  constructor() {
    super(TABLE_NAME)
  }
}

export default new SpeciesModel()
