import IInteraction from '../../Interfaces/InteractionModel'
import Interaction from '../../database/models/Intereaction'

interface IInteractionRepository {
  save(interactionsId: IInteraction): Promise<Interaction>
  count(): Promise<number>
  findOne(interactionId: string): Promise<Interaction>
  delete(interactionId: string): Promise<void>
}

export default IInteractionRepository
