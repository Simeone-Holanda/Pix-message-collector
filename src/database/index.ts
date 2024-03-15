import { Sequelize } from 'sequelize-typescript'
// eslint-disable-next-line
const dbConfig = require("../config/db");

const sequelize = new Sequelize(dbConfig[process.env.NODE_ENV])

// Models do sistema
const models = []

sequelize.addModels(models)

export default sequelize
