const TABLE_NAME = 'film_starships'

exports.seed = async function (knex) {
  await knex(TABLE_NAME).del()
  const filmRecords = await knex('films').select('id', 'starships')
  const seedEntries = []

  filmRecords.forEach((filmRecord) => {
    const filmId = filmRecord.id
    const starshipIds = filmRecord.starships || []
    // NOTE: Filtering ids that are not included in the dataset
    const filteredStarshipIds = starshipIds.filter((id) => id <= 36)
    filteredStarshipIds.forEach((starshipId) => {
      seedEntries.push({
        film_id: filmId,
        starship_id: starshipId,
      })
    })
  })

  await knex(TABLE_NAME).insert(seedEntries)
}
