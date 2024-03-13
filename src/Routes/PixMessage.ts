import { Router } from 'express'
import {
  ConnectionStreamController,
  FindAllMessagesController,
  StoreMessageController,
} from '../Controllers/PixMessageControllers'

const routes = Router()

routes.post('/api/util/msgs/:ispb/:number', StoreMessageController)

routes.get('/messages', FindAllMessagesController)

routes.get('/api/pix/:ispb/stream/start', ConnectionStreamController)

export default routes
