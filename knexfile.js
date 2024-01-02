module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'postgres-db-1.c5yqoeca0vam.us-east-2.rds.amazonaws.com',
      user: 'root',
      password: 'root',
      database: 'star_wars',
      port: 5432,
      ssl: { rejectUnauthorized: false },
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
  },
}
