exports.up = function (knex) {
  return knex.schema.createTable('film_starships', (table) => {
    table.increments('id').primary()
    table.integer('film_id').unsigned().references('id').inTable('films')
    table.integer('starship_id').unsigned().references('id').inTable('starships')
    table.timestamps(true, true)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('film_starships')
}
