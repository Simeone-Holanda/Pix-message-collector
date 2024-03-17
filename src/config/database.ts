require('dotenv/config')

// DEVELOPMENT
const dbDialect = process.env.DIALECT || 'mysql'
const dbName = process.env.DB_NAME
const dbUser = process.env.DB_USER
const dbHost = process.env.DB_HOST
const dbPort = process.env.DB_PORT
const dbPassword = process.env.DB_PASSWORD

const dbNameTest = process.env.DB_TESTS_NAME
const dbUserTest = process.env.DB_TESTS_USER
const dbHostTest = process.env.DB_TESTS_HOST
const dbPortTest = process.env.DB_TESTS_PORT
const dbPasswordTest = process.env.DB_TESTS_PASSWORD

module.exports = {
  development: {
    username: dbUser,
    password: dbPassword,
    database: dbName,
    host: dbHost,
    port: dbPort,
    dialect: dbDialect,
    timezone: '-03:00',
    logging: false,
  },
  test: {
    username: dbUserTest,
    password: dbPasswordTest,
    database: dbNameTest,
    host: dbHostTest,
    port: dbPortTest,
    dialect: dbDialect,
    timezone: '-03:00',
    logging: false,
  },
}
