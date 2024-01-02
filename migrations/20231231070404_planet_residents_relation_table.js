exports.up = function (knex) {
  return knex.schema.createTable('planet_residents', (table) => {
    table.increments('id').primary()
    table.integer('planet_id').unsigned().references('id').inTable('planets')
    table.integer('resident_id').unsigned().references('id').inTable('people')
    table.timestamps(true, true)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('planet_residents')
}
