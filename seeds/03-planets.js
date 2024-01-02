const { convertKeysToIntegerList, getTableJSON } = require('./util')

const TABLE_NAME = 'planets'
const TABLE_FILENAME = 'planets.json'
const TABLE_JSON = getTableJSON(TABLE_FILENAME)

function cleanDataSet(planetData) {
  const keysToConvert = ['films', 'residents']
  const convertConfig = { data: planetData, keysToConvert }
  return convertKeysToIntegerList(convertConfig)
}

const cleanedPlanetData = TABLE_JSON.map(cleanDataSet)

exports.seed = function (knex) {
  return knex(TABLE_NAME)
    .del()
    .then(function () {
      return knex(TABLE_NAME).insert(cleanedPlanetData)
    })
}
