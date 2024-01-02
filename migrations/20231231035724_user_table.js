const { TableBuilder } = require('knex')

exports.up = function (knex) {
  return knex.schema.createTable('users', function (table) {
    table.increments('id').primary()
    table.string('username').notNullable().unique()
    table.string('password').notNullable()
    table.boolean('deleted').defaultTo(false)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('users')
}
