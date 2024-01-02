const { convertKeysToIntegerList, getTableJSON } = require('./util')

const TABLE_NAME = 'vehicles'
const TABLE_FILENAME = 'vehicles.json'
const TABLE_JSON = getTableJSON(TABLE_FILENAME)

function cleanDataSet(vehicleData) {
  const keysToConvert = ['films', 'pilots']
  const convertConfig = { data: vehicleData, keysToConvert }
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
