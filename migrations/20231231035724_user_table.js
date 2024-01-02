exports.up = async function (knex) {
  await knex.transaction(async (trx) => {
    await trx.schema.createTable('users', function (table) {
      table.increments('id').primary()
      table.string('username').notNullable().unique()
      table.string('password').notNullable()
      table.boolean('deleted').defaultTo(false)
    })

    await trx('users').insert({
      username: 'test',
      password: '$2a$10$32pclAuxAdX555CG/rQtXuNIQCQnRqjmloXS0X6F8b6eJ2pDv2utO',
      deleted: false,
    })
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('users')
}
