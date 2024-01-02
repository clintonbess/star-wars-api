const TABLE_NAME = 'people_films'

exports.seed = async function (knex) {
  await knex(TABLE_NAME).del()
  const peopleRecords = await knex('people').select('id', 'films')
  const seedEntries = []

  peopleRecords.forEach((person) => {
    const peopleId = person.id
    const filmIds = person.films || []
    filmIds.forEach((filmId) => {
      seedEntries.push({
        people_id: peopleId,
        film_id: filmId,
      })
    })
  })

  await knex(TABLE_NAME).insert(seedEntries)
}
