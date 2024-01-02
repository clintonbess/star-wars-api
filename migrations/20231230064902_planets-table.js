exports.up = function (knex) {
  return knex.schema.createTable('planets', function (table) {
    table.increments('id').primary()
    table.string('planet_name')
    table.string('climate')
    table.string('diameter')
    table.specificType('films', 'integer[]')
    table.string('gravity')
    table.string('orbital_period')
    table.string('population')
    table.specificType('residents', 'integer[]')
    table.string('rotation_period')
    table.string('surface_water')
    table.string('terrain')
    table.string('url')
    table.timestamp('edited')
    table.timestamp('created')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('planets')
}
