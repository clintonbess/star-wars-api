exports.up = function (knex) {
  return knex.schema.createTable('people_films', (table) => {
    table.increments('id').primary()
    table.integer('people_id').unsigned().references('id').inTable('people')
    table.integer('film_id').unsigned().references('id').inTable('films')
    table.timestamps(true, true)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('people_films')
}
