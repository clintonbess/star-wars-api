exports.up = function (knex) {
  return knex.schema.createTable('starship_pilots', (table) => {
    table.increments('id').primary()
    table.integer('people_id').unsigned().references('id').inTable('people')
    table.integer('starship_id').unsigned().references('id').inTable('starships')
    table.timestamps(true, true)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('starship_pilots')
}
