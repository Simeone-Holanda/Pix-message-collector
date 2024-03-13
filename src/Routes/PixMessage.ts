import { Router } from 'express'
import { StoreMessageController } from '../Controllers/PixMessageControllers'

const routes = Router()

routes.post('/api/util/msgs/:ispb/:number', StoreMessageController)

export default routes
