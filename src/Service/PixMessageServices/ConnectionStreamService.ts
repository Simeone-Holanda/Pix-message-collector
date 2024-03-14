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

  execute(ispb: string, responseOne: boolean) {
    const interationId = uuidv4().slice(0, 15)
    // verificando é possível se conectar
    if (this.interactionRepository.count() > 6)
      throw new HttpError('The maximum flow limit has been exceeded. ', 429)

    this.interactionRepository.save({
      id: interationId,
      ispb,
    })
    if (responseOne) {
      // const message = messages.find((m) => m.recebedor.ispb === ispb && !m.sent)
      const message = this.pixMessageRepository.findOne(ispb)
      this.pixMessageRepository.update(message.id, { sent: true })
      return { message, interationId }
    } else {
      const responseMessages = this.pixMessageRepository.findAll(
        ispb,
        10,
        false,
      )
      responseMessages.map((rm) =>
        this.pixMessageRepository.update(rm.id, { sent: true }),
      )
      return {
        messages: responseMessages,
        interationId,
      }
    }
  }
}

const connectionStreamServiceInstance = new ConnectionStreamService(
  pixMessageRespositoryInstance,
  interactionRepositoryInstance,
)

// export default connectionStreamService
export { ConnectionStreamService, connectionStreamServiceInstance }
