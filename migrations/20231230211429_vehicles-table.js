exports.up = function (knex) {
  return knex.schema.createTable('vehicles', function (table) {
    table.increments('id').primary()
    table.string('vehicle_name')
    table.string('cargo_capacity')
    table.string('consumables')
    table.string('cost_in_credits')
    table.integer('crew')
    table.specificType('films', 'integer[]')
    table.string('length')
    table.string('manufacturer')
    table.string('max_atmosphering_speed')
    table.string('model')
    table.string('passengers')
    table.specificType('pilots', 'integer[]')
    table.integer('url')
    table.string('vehicle_class')
    table.boolean('deleted').defaultTo(false)
    table.timestamp('edited')
    table.timestamp('created')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('vehicles')
}
