import { Sequelize } from 'sequelize-typescript'
import Person from './models/Person'
import PixMessage from './models/PixMessages'
import Interaction from './models/Intereaction'
// eslint-disable-next-line
const dbConfig = require("../config/database");

const sequelize = new Sequelize(dbConfig[process.env.NODE_ENV])

const models = [Person, PixMessage, Interaction]

sequelize.addModels(models)

async function resetDataBase() {
  if (process.env.NODE_ENV !== 'test') {
    await sequelize.drop()
    await sequelize.sync()
  }
}
resetDataBase()
export default sequelize
