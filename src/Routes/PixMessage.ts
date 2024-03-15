import { Router } from 'express'
import connectionStreamController from '../Controllers/PixMessageControllers/ConnectionStreamController'
import storeMessageController from '../Controllers/PixMessageControllers/StoreMessageController'
import findAllMessagesController from '../Controllers/PixMessageControllers/FindAllMessages'
import stopConnectionController from '../Controllers/PixMessageControllers/StopConnectionController'

const routes = Router()

routes.post('/api/util/msgs/:ispb/:number', (req, res) => {
  storeMessageController.execute(req, res)
})

routes.get('/messages', (req, res) => {
  findAllMessagesController.execute(req, res)
})

routes.get('/api/pix/:ispb/stream/start', async (req, res) =>
  connectionStreamController.execute(req, res),
)

routes.get('/api/pix/:ispb/stream/:interationId', async (req, res) =>
  connectionStreamController.execute(req, res),
)

routes.delete('/api/pix/:ispb/stream/:interationId', (req, res) =>
  stopConnectionController.execute(req, res),
)

export default routes
