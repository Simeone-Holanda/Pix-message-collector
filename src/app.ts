import express, { Application } from 'express'
import routes from './Routes'
import helmet from 'helmet'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import swaggerFile from './swagger.json'
import './database'

class App {
  public app: Application

  constructor() {
    this.app = express()
    this.routes()
  }

  config() {
    this.app.use(express.json())
    this.app.use(morgan('dev'))
    this.app.use(helmet())
  }

  routes() {
    this.app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
    this.app.use(routes)
  }

  listen(port: number) {
    this.app.listen(port, () => console.log(`server running on port ${port}`))
  }
}
export { App }
