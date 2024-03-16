import { Request, Response } from 'express'
import {
  StoreMessageService,
  storeMessageServiceInstance,
} from '../../Service/PixMessageServices/StorageMessageService'

class StoreMessageController {
  private readonly storeMessageService: StoreMessageService
  constructor(storeMessage: StoreMessageService) {
    this.storeMessageService = storeMessage
  }

  async execute(request: Request, response: Response) {
    const { ispb, number } = request.params
    await this.storeMessageService.execute(ispb, number)
    return response
      .status(201)
      .json({ message: 'Mensagens PIX adicionadas com sucesso.' })
  }
}

const storeMessageController = new StoreMessageController(
  storeMessageServiceInstance,
)
export default storeMessageController
