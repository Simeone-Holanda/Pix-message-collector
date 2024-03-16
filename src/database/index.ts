import { Sequelize } from 'sequelize-typescript'
import Person from './models/Person'
import PixMessage from './models/PixMessages'
import Interaction from './models/Intereaction'
// eslint-disable-next-line
const dbConfig = require("../config/db");

const sequelize = new Sequelize(dbConfig[process.env.NODE_ENV])

const models = [Person, PixMessage, Interaction]

sequelize.addModels(models)

export default sequelize
