import IInteraction from '../../Interfaces/InteractionModel'

interface IInteractionRepository {
  save(interactionsId: IInteraction): void
  count(): number
  findOne(interactionId: string): IInteraction
  delete(interactionId: string): void
}

export default IInteractionRepository
