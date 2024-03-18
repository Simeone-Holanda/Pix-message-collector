import { Router } from 'express'
import connectionStreamController from '../Controllers/PixMessageControllers/ConnectionStreamController'
import storeMessageController from '../Controllers/PixMessageControllers/StoreMessageController'
import findAllMessagesController from '../Controllers/PixMessageControllers/FindAllMessages'
import stopConnectionController from '../Controllers/PixMessageControllers/StopConnectionController'

const routes = Router()

routes.post('/api/util/msgs/:ispb/:number', async (req, res) => {
  await storeMessageController.execute(req, res)
})

routes.get('/messages', async (req, res) => {
  await findAllMessagesController.execute(req, res)
})

routes.get(
  '/api/pix/:ispb/stream/start',
  async (req, res) => await connectionStreamController.execute(req, res),
)

routes.get(
  '/api/pix/:ispb/stream/:interationId',
  async (req, res) => await connectionStreamController.execute(req, res),
)

routes.delete(
  '/api/pix/:ispb/stream/stop/:interationId',
  async (req, res) => await stopConnectionController.execute(req, res),
)

export default routes
