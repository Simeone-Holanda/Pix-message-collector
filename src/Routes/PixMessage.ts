import { Router } from 'express'
import {
  // ConnectionStreamController,
  FindAllMessagesController,
  StoreMessageController,
} from '../Controllers/PixMessageControllers'
import connectionStreamController from '../Controllers/PixMessageControllers/ConnectionStreamController'

const routes = Router()

routes.post('/api/util/msgs/:ispb/:number', StoreMessageController)

routes.get('/messages', FindAllMessagesController)

routes.get('/api/pix/:ispb/stream/start', (req, res) =>
  connectionStreamController.execute(req, res),
)

export default routes
