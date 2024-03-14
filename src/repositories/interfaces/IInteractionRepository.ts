import IInteraction from '../../Models/InteractionModel'

interface IInteractionRepository {
  save(interactionsId: IInteraction): void
  count(): number
  findOne(interactionId: string): IInteraction
}

export default IInteractionRepository
