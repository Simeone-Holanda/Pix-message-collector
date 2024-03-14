import { v4 as uuidv4 } from 'uuid'
import HttpError from '../../Errors/httpError'
import { IPixMessageRepository } from '../../repositories/interfaces/IPixMessage'
import IInteractionRepository from '../../repositories/interfaces/IInteractionRepository'
import pixMessageRespositoryInstance from '../../repositories/implementations/PixMessageRespository'
import interactionRepositoryInstance from '../../repositories/implementations/InteractionRepository'

// export function ConnectionStreamService(ispb: string, responseOne: boolean) {}

class ConnectionStreamService {
  private readonly pixMessageRepository: IPixMessageRepository
  private readonly interactionRepository: IInteractionRepository

  constructor(
    pixMessageRepository: IPixMessageRepository,
    interactionRepository: IInteractionRepository,
  ) {
    this.pixMessageRepository = pixMessageRepository
    this.interactionRepository = interactionRepository
  }

  checkInteraction(interactionId: string) {
    const hasInteraction = this.interactionRepository.findOne(interactionId)
    if (!hasInteraction) {
      throw new HttpError('Interaction not found, check your connection', 404)
    }
  }

  executeDataCapture(ispb: string, responseOne: boolean, interationId: string) {
    if (interationId) {
      this.checkInteraction(interationId)
    }
    if (responseOne) {
      const message = this.pixMessageRepository.findOne(ispb)

      if (!message) {
        return {
          message: null,
          interationId,
        }
      }
      this.pixMessageRepository.update(message.id, { sent: true })
      return { message, interationId }
    } else {
      const responseMessages = this.pixMessageRepository.findAll(
        ispb,
        10,
        false,
      )
      if (!responseMessages.length)
        return {
          messages: null,
          interationId,
        }

      responseMessages.map((rm) =>
        this.pixMessageRepository.update(rm.id, { sent: true }),
      )
      return {
        messages: responseMessages,
        interationId,
      }
    }
  }

  executeConnection(ispb: string, responseOne: boolean) {
    const interationId = uuidv4().slice(0, 15)
    // verificando é possível se conectar
    if (this.interactionRepository.count() > 6)
      throw new HttpError('The maximum stream limit has been exceeded. ', 429)

    this.interactionRepository.save({
      id: interationId,
      ispb,
    })
    return this.executeDataCapture(ispb, responseOne, interationId)
  }
}

const connectionStreamServiceInstance = new ConnectionStreamService(
  pixMessageRespositoryInstance,
  interactionRepositoryInstance,
)

// export default connectionStreamService
export { ConnectionStreamService, connectionStreamServiceInstance }
