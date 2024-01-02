const { convertKeysToIntegerList, getTableJSON } = require('./util')

const TABLE_NAME = 'films'
const TABLE_FILENAME = 'films.json'
const TABLE_JSON = getTableJSON(TABLE_FILENAME)

function updateColumns(filmsData) {
  const filmTitle = filmsData.movie_title
  delete filmsData.movie_title

  return {
    film_title: filmTitle,
    ...filmsData,
  }
}

function cleanDataSet(filmsData) {
  const updatedFilmData = updateColumns(filmsData)
  const keysToConvert = ['characters', 'planets', 'species', 'starships', 'vehicles']
  const convertConfig = { data: updatedFilmData, keysToConvert }
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
