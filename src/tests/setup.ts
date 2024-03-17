import sequelize from '../database'

beforeAll(async () => {
  await sequelize.sync()
})

afterAll(async () => {
  await sequelize.drop()
  await sequelize.close()
})
