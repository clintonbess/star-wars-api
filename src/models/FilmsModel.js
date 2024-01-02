import BaseModel from './BaseModel'

const TABLE_NAME = 'films'

class FilmsModel extends BaseModel {
  constructor() {
    super(TABLE_NAME)
  }

  // Finds the fastest starship for a given film ID by matching film and starship IDs
  // in the film_starships table
  async getFilmFastestStarship(filmId) {
    try {
      const query = `
        SELECT
          films.id,
          films.film_title,
          film_starships.starship_id,
          starships.starship_title,
          MAX(CAST(starships.max_atmosphering_speed AS NUMERIC)) AS max_atmosphering_speed
        FROM
          film_starships
        JOIN
          starships ON film_starships.starship_id = starships.id
        JOIN
          films ON film_starships.film_id = films.id
        WHERE
          film_starships.film_id = $1
          AND starships.max_atmosphering_speed NOT IN ('n/a', 'unknown')
        GROUP BY
          film_starships.starship_id, starships.starship_title, films.film_title, films.id
        ORDER BY
          max_atmosphering_speed DESC
        LIMIT 1;
      `

      const result = await this.db.query(query, [filmId])
      return result.rows[0]
    } catch (err) {
      throw err
    }
  }
}

export default new FilmsModel()
