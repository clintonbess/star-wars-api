import BaseModel from './BaseModel'

const TABLE_NAME = 'planets'

class PlanetsModel extends BaseModel {
  constructor() {
    super(TABLE_NAME)
  }

  // Finds the species of a planet by matching people_ids sand planet_ids in the planet_residents table
  async getSpeciesFromPlanet(planetId) {
    try {
      const query = `
      SELECT
        planets.id,
        planets.planet_name,
        ARRAY_AGG(
          DISTINCT jsonb_build_object(
            'id', species.id,
            'species_name', species.species_name
          )
        ) AS species
      FROM planets
      LEFT JOIN planet_residents ON planets.id = planet_residents.planet_id
      LEFT JOIN people ON people.id = planet_residents.resident_id
      LEFT JOIN species ON people.species = species.id
      WHERE planets.id = $1
      GROUP BY planets.id;
   `
      const result = await this.db.query(query, [planetId])
      return result.rows[0]
    } catch (err) {
      throw err
    }
  }
}

export default new PlanetsModel()
