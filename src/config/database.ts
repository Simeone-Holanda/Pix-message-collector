require('dotenv/config')

const dbDialect = process.env.DIALECT || 'mysql'
const dbName = process.env.DB_NAME
const dbUser = process.env.DB_USER
const dbHost = process.env.DB_HOST
const dbPort = process.env.DB_PORT
const dbPassword = process.env.DB_PASSWORD

module.exports = {
  development: {
    username: dbUser,
    password: dbPassword,
    database: dbName,
    host: dbHost,
    port: dbPort,
    dialect: dbDialect,
    timezone: '-03:00',
  },
}
