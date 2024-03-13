import { Router } from 'express'
import pixMessageRoute from './PixMessage'

const routes = Router()

routes.use(pixMessageRoute)

export default routes
