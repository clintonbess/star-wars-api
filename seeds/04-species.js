const { convertKeysToIntegerList, getTableJSON } = require('./util')

const TABLE_NAME = 'species'
const TABLE_FILENAME = 'species.json'
const TABLE_JSON = getTableJSON(TABLE_FILENAME)

function cleanDataSet(speciesData) {
  const keysToConvert = ['films', 'people']
  const convertConfig = { data: speciesData, keysToConvert }
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
