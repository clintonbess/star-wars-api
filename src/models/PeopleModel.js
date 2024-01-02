import BaseModel from './BaseModel'

const TABLE_NAME = 'people'

class PeopleModel extends BaseModel {
  constructor() {
    super(TABLE_NAME)
  }

  async searchCharacterName(searchQuery) {
    try {
      const query = `
        SELECT * FROM people
        WHERE people.character_name ILIKE $1
      `
      const result = await this.db.query(query, [`%${searchQuery}%`])
      return result.rows
    } catch (err) {
      console.error(`Error searching for character: ${searchQuery}`, err)
      throw err
    }
  }

  // Returns the films a character has participated in by matching film_ids and people_ids
  // in the people_films table
  async getPersonWithFilms(peopleId) {
    try {
      const query = `
        SELECT
          people.id,
          people.character_name,
          ARRAY_AGG(
            jsonb_build_object(
              'id', films.id,
              'title', films.film_title,
              'description', films.description
            )
          ) AS films
        FROM people
        LEFT JOIN people_films ON people.id = people_films.people_id
        LEFT JOIN films ON films.id = people_films.film_id
        WHERE people.id = $1
        GROUP BY people.id;
      `
      const result = await this.db.query(query, [peopleId])
      return result.rows[0]
    } catch (err) {
      throw err
    }
  }

  // Returns a person with the language of their species
  async getPersonWithSpecies(peopleId) {
    try {
      const query = `
        SELECT
          people.id,
          people.character_name,
          species.species_name,
          species.language
        FROM people
        JOIN species ON people.species = species.id
        WHERE people.id = $1
      `
      const result = await this.db.query(query, [peopleId])
      return result.rows[0]
    } catch (err) {
      throw err
    }
  }
}

export default new PeopleModel()
