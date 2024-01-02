const { convertKeysToIntegerList, getTableJSON } = require('./util')

const TABLE_NAME = 'people'
const TABLE_FILENAME = 'people.json'
const TABLE_JSON = getTableJSON(TABLE_FILENAME)

function updateColumns(characterData) {
  const defaultSpecies = 1

  return {
    species: defaultSpecies,
    ...characterData,
  }
}

function cleanCharacterData(characterData) {
  const updatedCharacterData = updateColumns(characterData)
  const keysToConvert = ['films', 'starships', 'vehicles']
  const convertConfig = { data: updatedCharacterData, keysToConvert }
  return convertKeysToIntegerList(convertConfig)
}

const cleanedFilmData = TABLE_JSON.map(cleanCharacterData)

exports.seed = function (knex) {
  return knex(TABLE_NAME)
    .del()
    .then(function () {
      return knex(TABLE_NAME).insert(cleanedFilmData)
    })
}
