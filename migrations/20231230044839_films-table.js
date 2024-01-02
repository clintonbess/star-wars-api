exports.up = function (knex) {
  return knex.schema.createTable('films', function (table) {
    table.increments('id').primary()
    table.string('film_title')
    table.integer('episode_id')
    table.specificType('characters', 'integer[]')
    table.string('director')
    table.text('description')
    table.specificType('planets', 'integer[]')
    table.string('producer')
    table.timestamp('release_date')
    table.specificType('species', 'integer[]')
    table.specificType('starships', 'integer[]')
    table.string('url')
    table.specificType('vehicles', 'integer[]')
    table.timestamp('edited')
    table.timestamp('created')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('films')
}
