import IInteraction from '../../Models/InteractionModel'

interface IInteractionRepository {
  save(interactionsId: IInteraction): void
  count(): number
}

export default IInteractionRepository
