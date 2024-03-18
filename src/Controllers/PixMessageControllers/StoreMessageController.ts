import { Request, Response } from 'express'
import {
  StoreMessageService,
  storeMessageServiceInstance,
} from '../../Service/PixMessageServices/StorageMessageService'
import HttpError from '../../Errors/httpError'

class StoreMessageController {
  private readonly storeMessageService: StoreMessageService
  constructor(storeMessage: StoreMessageService) {
    this.storeMessageService = storeMessage
  }

  async execute(request: Request, response: Response) {
    try {
      const { ispb, number } = request.params
      if (!ispb || !number)
        throw new HttpError('Ispb or number not found. ', 400)
      await this.storeMessageService.execute(ispb, number)
      return response
        .status(201)
        .json({ message: 'Mensagens PIX adicionadas com sucesso.' })
    } catch (error) {
      if (error instanceof HttpError) {
        return response.status(error.statusCode).send({
          message: error.message,
        })
      } else {
        return response.status(500).json({
          message:
            'An internal server error has occurred, contact the developer. ',
        })
      }
    }
  }
}

const storeMessageController = new StoreMessageController(
  storeMessageServiceInstance,
)
export default storeMessageController
