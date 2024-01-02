const { convertKeysToIntegerList, getTableJSON } = require('./util')

const TABLE_NAME = 'starships'
const TABLE_FILENAME = 'starships.json'
const TABLE_JSON = getTableJSON(TABLE_FILENAME)

function updateColumns(starshipData) {
  const mglt = starshipData.MGLT
  delete starshipData.MGLT

  return {
    mglt,
    ...starshipData,
  }
}

function cleanDataSet(starshipData) {
  const updatedData = updateColumns(starshipData)
  const keysToConvert = ['pilots']
  const convertConfig = { data: updatedData, keysToConvert }
  return convertKeysToIntegerList(convertConfig)
}

const cleanedFilmData = TABLE_JSON.map(cleanDataSet)
exports.seed = function (knex) {
  return knex(TABLE_NAME)
    .del()
    .then(function () {
      return knex(TABLE_NAME).insert(cleanedFilmData)
    })
}
