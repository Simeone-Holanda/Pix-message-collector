import HttpError from '../../Errors/httpError'
import IPixMessage from '../../Interfaces/PixMessageModel'
import {
  ConnectionStreamService,
  connectionStreamServiceInstance,
} from '../../Service/PixMessageServices/ConnectionStreamService'
import { Response, Request } from 'express'
import PixMessage from '../../database/models/PixMessages'

class ConnectionStreamController {
  private readonly connectionStreamService: ConnectionStreamService

  constructor(connectionStream: ConnectionStreamService) {
    this.connectionStreamService = connectionStream
  }

  async longPolling(interationId: string, responseOne: boolean, ispb: string) {
    let response: PixMessage | PixMessage[]
    for (let i = 0; i < 8; i++) {
      await new Promise((resolve, reject) =>
        setTimeout(async () => {
          try {
            const responseMessage =
              await this.connectionStreamService.executeDataCapture(
                ispb,
                responseOne,
                interationId,
              )
            if (
              !responseMessage?.message &&
              !responseMessage?.messages?.length &&
              i === 7
            ) {
              reject(new HttpError('No content', 204))
            } else {
              console.log('responseMessage')
              console.log(responseMessage)
              response = responseOne
                ? responseMessage?.message?.get({ plain: true })
                : responseMessage?.messages?.map((m) => m.get({ plain: true }))
            }
            resolve('')
          } catch (error) {
            console.log(error)
            if (error instanceof HttpError) {
              reject(new HttpError(error.message, error.statusCode))
            } else {
              reject(error.message)
            }
          }
        }, 1000),
      )
      if (response) {
        return response
      }
    }
  }

  async execute(request: Request, response: Response): Promise<Response> {
    try {
      const { ispb, interationId } = request.params
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
      const responseMessage = interationId
        ? await this.connectionStreamService.executeDataCapture(
            ispb,
            responseOne,
            interationId,
          )
        : await this.connectionStreamService.executeConnection(
            ispb,
            responseOne,
          )

      response.setHeader(
        'Pull-Next',
        `/api/pix/${ispb}/stream/${responseMessage?.interationId}`,
      )
      if (!responseMessage?.message && !responseMessage?.messages?.length) {
        const data = await this.longPolling(interationId, responseOne, ispb)
        console.log('data')
        console.log(data)
        return response.status(200).json({ ...data })
        // response.status(204).json({ message: 'No content' })
      } else
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
