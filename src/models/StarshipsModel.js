import BaseModel from './BaseModel'

const TABLE_NAME = 'starships'

class StarshipsModel extends BaseModel {
  constructor() {
    super(TABLE_NAME)
  }

  // Returns a starship and its corresponding pilots by matching people_ids and starship_ids
  // in the starship_pilots table
  async getStarshipPilots(starshipId) {
    try {
      const query = `
        SELECT
          starships.id,
          starships.starship_title,
          starships.model,
          starships.starship_class,
          CASE
            WHEN COUNT(people.id) = 0 THEN '{}'::jsonb[]
            ELSE ARRAY_AGG(
              jsonb_build_object(
                'id', people.id,
                'character_name', people.character_name
              )
            )
          END AS pilots
        FROM starships
        LEFT JOIN starship_pilots ON starships.id = starship_pilots.starship_id
        LEFT JOIN people ON people.id = starship_pilots.people_id
        WHERE starships.id = $1
        GROUP BY starships.id;
      `
      const result = await this.db.query(query, [starshipId])
      return result.rows[0]
    } catch (err) {
      throw err
    }
  }
}

export default new StarshipsModel()
