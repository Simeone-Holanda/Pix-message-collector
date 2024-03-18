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

  async checkInteraction(interactionId: string) {
    const hasInteraction =
      await this.interactionRepository.findOne(interactionId)
    if (!hasInteraction) {
      throw new HttpError('Interaction not found, check your connection', 404)
    }
  }

  async executeDataCapture(
    ispb: string,
    responseOne: boolean,
    interationId: string,
  ) {
    if (interationId) {
      await this.checkInteraction(interationId)
    }
    if (responseOne) {
      const message = await this.pixMessageRepository.findOne(ispb)
      if (
        !message ||
        (message?.id &&
          this.pixMessageRepository.cacheMessage.includes(message?.id))
      ) {
        return {
          message: null,
          interationId,
        }
      }
      this.pixMessageRepository.cacheMessage.push(message.id)
      await this.pixMessageRepository.update(message.id, { sent: true })
      this.pixMessageRepository.cacheMessage =
        this.pixMessageRepository.cacheMessage.filter((cm) => cm !== message.id)
      return { message, interationId }
    } else {
      const responseMessages = await this.pixMessageRepository.findAll(
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

  async executeConnection(ispb: string, responseOne: boolean) {
    // verificando é possível se conectar
    const countInteraction = await this.interactionRepository.count()
    if (countInteraction > 6)
      throw new HttpError('The maximum stream limit has been exceeded. ', 429)

    const interaction = await this.interactionRepository.save({
      ispb,
    })
    return this.executeDataCapture(ispb, responseOne, interaction.id)
  }
}

const connectionStreamServiceInstance = new ConnectionStreamService(
  pixMessageRespositoryInstance,
  interactionRepositoryInstance,
)

// export default connectionStreamService
export { ConnectionStreamService, connectionStreamServiceInstance }
