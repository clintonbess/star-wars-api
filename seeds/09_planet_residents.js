const TABLE_NAME = 'planet_residents'

exports.seed = async function (knex) {
  await knex(TABLE_NAME).del()
  const planetRecords = await knex('planets').select('id', 'residents')
  const seedEntries = []

  planetRecords.forEach((planetRecord) => {
    const planetId = planetRecord.id
    const residentIds = planetRecord.residents || []
    residentIds.forEach((residentId) => {
      seedEntries.push({
        resident_id: residentId,
        planet_id: planetId,
      })
    })
  })

  await knex(TABLE_NAME).insert(seedEntries)
}
