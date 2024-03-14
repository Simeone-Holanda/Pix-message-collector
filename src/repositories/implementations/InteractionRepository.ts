import IInteraction from '../../Models/InteractionModel'
import IInteractionRepository from '../interfaces/IInteractionRepository'

class InteractionRepository implements IInteractionRepository {
  interaction: IInteraction[] = []
  save(interaction: IInteraction): void {
    this.interaction.push(interaction)
  }

  count(): number {
    return this.interaction.length
  }

  findOne(interactionId: string): IInteraction {
    return this.interaction.find((inte) => inte.id === interactionId)
  }
}

const interactionRepositoryInstance = new InteractionRepository()

export default interactionRepositoryInstance
