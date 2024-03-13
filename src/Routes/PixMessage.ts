import { Router } from 'express'
import {
  FindAllMessagesController,
  StoreMessageController,
} from '../Controllers/PixMessageControllers'

const routes = Router()

routes.post('/api/util/msgs/:ispb/:number', StoreMessageController)

routes.get('/messages', FindAllMessagesController)

export default routes
