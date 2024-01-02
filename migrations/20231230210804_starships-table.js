exports.up = function (knex) {
  return knex.schema.createTable('starships', function (table) {
    table.increments('id').primary()
    table.string('starship_title')
    table.string('mglt')
    table.string('cargo_capacity')
    table.string('consumables')
    table.string('cost_in_credits')
    table.string('crew')
    table.string('hyperdrive_rating')
    table.float('length')
    table.string('manufacturer')
    table.string('max_atmosphering_speed')
    table.string('model')
    table.string('passengers')
    table.specificType('pilots', 'integer[]')
    table.string('starship_class')
    table.integer('url')
    table.boolean('deleted').defaultTo(false)
    table.timestamp('created')
    table.timestamp('edited')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('starships')
}
