import HttpError from '../../Errors/httpError'
import {
  ConnectionStreamService,
  connectionStreamServiceInstance,
} from '../../Service/PixMessageServices/ConnectionStreamService'
import { Response, Request } from 'express'

class ConnectionStreamController {
  private readonly connectionStreamService: ConnectionStreamService

  constructor(connectionStream: ConnectionStreamService) {
    this.connectionStreamService = connectionStream
  }

  execute(request: Request, response: Response): Response {
    try {
      const { ispb } = request.params

      let responseOne = false
      if (
        request.headers.accept &&
        request.headers.accept === 'multipart/json'
      ) {
        responseOne = false
      }
      if (
        !request.headers.accept ||
        request.headers.accept === 'application/json'
      ) {
        responseOne = true
      }
      const responseMessage = this.connectionStreamService.execute(
        ispb,
        responseOne,
      )
      response.setHeader(
        'Pull-Next',
        `/api/pix/${ispb}/stream/${responseMessage?.interationId}`,
      )
      if (!responseMessage?.message && !responseMessage?.messages?.length)
        return response.status(204).json({ message: 'No content' })
      else
        return response
          .status(200)
          .json(
            responseOne ? responseMessage.message : responseMessage.messages,
          )
    } catch (error) {
      console.log(error)
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

const connectionStreamController = new ConnectionStreamController(
  connectionStreamServiceInstance,
)
export default connectionStreamController
