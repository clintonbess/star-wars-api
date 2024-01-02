module.exports = {
  jwtSecret: 'some-jwt-secret',
  local: {
    db: {
      user: 'root',
      password: 'root',
      host: 'localhost',
      database: 'star_wars',
      port: 5432,
      max: 20,
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
  production: {
    db: {
      user: 'root',
      password: 'root',
      host: 'postgres-db-1.c5yqoeca0vam.us-east-2.rds.amazonaws.com',
      database: 'star_wars',
      port: 5432,
      max: 20,
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
}
