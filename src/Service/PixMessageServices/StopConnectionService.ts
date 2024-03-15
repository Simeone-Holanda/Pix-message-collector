import HttpError from '../../Errors/httpError'
import IInteractionRepository from '../../repositories/interfaces/IInteractionRepository'
import interactionRepositoryInstance from '../../repositories/implementations/InteractionRepository'

class StopConnectionService {
  private readonly interactionRepository: IInteractionRepository

  constructor(interactionRepository: IInteractionRepository) {
    this.interactionRepository = interactionRepository
  }

  execute(interactionId: string, ispb: string): void {
    const interaction = this.interactionRepository.findOne(interactionId)
    if (!interaction || interaction?.ispb !== ispb)
      throw new HttpError('interactionId and ispb not found', 404)
    this.interactionRepository.delete(interaction.id)
  }
}

const stopConnectionServiceInstance = new StopConnectionService(
  interactionRepositoryInstance,
)

// export default connectionStreamService
export { StopConnectionService, stopConnectionServiceInstance }
