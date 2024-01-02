const TABLE_NAME = 'starship_pilots'

exports.seed = async function (knex) {
  await knex(TABLE_NAME).del()
  const starshipRecords = await knex('starships').select('id', 'pilots')
  const seedEntries = []

  starshipRecords.forEach((starship) => {
    const starshipId = starship.id
    const pilotIds = starship.pilots || []
    pilotIds.forEach((pilotId) => {
      seedEntries.push({
        people_id: pilotId,
        starship_id: starshipId,
      })
    })
  })
  await knex(TABLE_NAME).insert(seedEntries)
}
