exports.up = function (knex) {
  return knex.schema.createTable('people', function (table) {
    table.increments('id').primary()
    table.string('character_name')
    table.string('birth_year')
    table.string('eye_color')
    table.specificType('films', 'integer[]')
    table.string('gender')
    table.string('hair_color')
    table.string('height')
    table.integer('homeworld')
    table.string('mass')
    table.string('skin_color')
    table.integer('species')
    table.specificType('starships', 'integer[]')
    table.integer('url')
    table.specificType('vehicles', 'integer[]')
    table.timestamp('edited')
    table.timestamp('created')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('people')
}
