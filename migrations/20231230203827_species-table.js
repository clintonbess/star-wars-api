exports.up = function (knex) {
  return knex.schema.createTable('species', function (table) {
    table.increments('id').primary()
    table.string('species_name')
    table.string('average_height')
    table.string('average_lifespan')
    table.string('classification')
    table.string('designation')
    table.string('eye_colors')
    table.specificType('films', 'integer[]')
    table.string('hair_colors')
    table.integer('homeworld')
    table.string('language')
    table.specificType('people', 'integer[]')
    table.string('skin_colors')
    table.integer('url')
    table.timestamp('edited')
    table.timestamp('created')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('species')
}
