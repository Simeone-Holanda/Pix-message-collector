import { Router } from 'express'
import {
  // ConnectionStreamController,
  FindAllMessagesController,
} from '../Controllers/PixMessageControllers'
import connectionStreamController from '../Controllers/PixMessageControllers/ConnectionStreamController'
import storeMessageController from '../Controllers/PixMessageControllers/StoreMessageController'
import findAllMessagesController from '../Controllers/PixMessageControllers/FindAllMessages'

const routes = Router()

routes.post('/api/util/msgs/:ispb/:number', (req, res) => {
  storeMessageController.execute(req, res)
})

routes.get('/messages', (req, res) => {
  findAllMessagesController.execute(req, res)
})

routes.get('/api/pix/:ispb/stream/start', (req, res) =>
  connectionStreamController.execute(req, res),
)

export default routes
