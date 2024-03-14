import { Request, Response } from 'express'
import {
  FindAllMessageServices,
  findAllMessageServicesInstance,
} from '../../Service/PixMessageServices/FindAllMessagesService'

class FindAllMessagesController {
  private readonly findAllMessageServices: FindAllMessageServices

  constructor(findAllMessage: FindAllMessageServices) {
    this.findAllMessageServices = findAllMessage
  }

  execute(request: Request, response: Response): Response {
    try {
      return response.status(200).json(this.findAllMessageServices.execute())
    } catch (error) {
      return response.status(500).json({
        message:
          'An internal server error has occurred, contact the developer. ',
      })
    }
  }
}
const findAllMessagesController = new FindAllMessagesController(
  findAllMessageServicesInstance,
)
export default findAllMessagesController
