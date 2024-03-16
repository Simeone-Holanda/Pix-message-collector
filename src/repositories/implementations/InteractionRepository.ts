import IInteraction from '../../Interfaces/InteractionModel'
import Interaction from '../../database/models/Intereaction'
import IInteractionRepository from '../interfaces/IInteractionRepository'

class InteractionRepository implements IInteractionRepository {
  interactions: IInteraction[] = []

  async save(interaction: IInteraction) {
    await Interaction.create({
      ispb: interaction.ispb,
    })
  }

  async count(): Promise<number> {
    return await Interaction.count()
  }

  async findOne(interactionId: string): Promise<Interaction> {
    return await Interaction.findByPk(interactionId)
  }

  async delete(interactionId: string): Promise<void> {
    await Interaction.destroy({
      where: {
        id: interactionId,
      },
    })
  }
}

const interactionRepositoryInstance = new InteractionRepository()

export default interactionRepositoryInstance
