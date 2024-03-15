import HttpError from '../../Errors/httpError'
import { Response, Request } from 'express'
import {
  StopConnectionService,
  stopConnectionServiceInstance,
} from '../../Service/PixMessageServices/StopConnectionService'

class StopConnectionController {
  private readonly stopConnectionService: StopConnectionService

  constructor(stopConnectionService: StopConnectionService) {
    this.stopConnectionService = stopConnectionService
  }

  execute(request: Request, response: Response): Response {
    try {
      const { ispb, interationId } = request.params
      this.stopConnectionService.execute(interationId, ispb)
      return response.status(200).json({})
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

const stopConnectionController = new StopConnectionController(
  stopConnectionServiceInstance,
)
export default stopConnectionController
