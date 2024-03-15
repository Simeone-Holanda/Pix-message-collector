import IInteraction from '../../Models/InteractionModel'
import IInteractionRepository from '../interfaces/IInteractionRepository'

class InteractionRepository implements IInteractionRepository {
  interactions: IInteraction[] = []
  save(interaction: IInteraction): void {
    this.interactions.push(interaction)
  }

  count(): number {
    return this.interactions.length
  }

  findOne(interactionId: string): IInteraction {
    return this.interactions.find((inte) => inte.id === interactionId)
  }

  delete(interactionId: string): void {
    this.interactions = this.interactions.filter(
      (inte) => inte.id !== interactionId,
    )
  }
}

const interactionRepositoryInstance = new InteractionRepository()

export default interactionRepositoryInstance
