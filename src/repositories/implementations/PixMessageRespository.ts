import IPixMessage from '../../Interfaces/PixMessageModel'
import Person from '../../database/models/Person'
import PixMessage from '../../database/models/PixMessages'

import { IPixMessageRepository } from '../interfaces/IPixMessage'

export class PixMessageRepository implements IPixMessageRepository {
  cacheMessage = []

  async save(pixMessage: IPixMessage): Promise<PixMessage> {
    const message = await PixMessage.create({
      sent: false,
      recebedorId: pixMessage.recebedor,
      pagadorId: pixMessage.pagador,
      endToEndId: pixMessage.endToEndId,
      valor: pixMessage.valor,
      campoLivre: pixMessage.campoLivre,
      txId: pixMessage.txId,
      dataHoraPagamento: pixMessage.dataHoraPagamento,
    })
    return message
  }

  async findAll(
    ispbRecebedor?: string,
    limit?: number,
    sent?: boolean,
  ): Promise<PixMessage[]> {
    const messages = await PixMessage.findAll({
      where: {
        sent: false,
      },
      include: [
        {
          model: Person,
          as: 'recebedor',
        },
      ],
      limit,
    })
    if (!ispbRecebedor && !limit && !sent) {
      return await PixMessage.findAll({})
    } else {
      return messages.filter((mensagem) => {
        if (mensagem.recebedor.ispb === ispbRecebedor) {
          return true
        }
        return false
      })
    }
  }

  async findOne(ispbRecebedor: string): Promise<PixMessage> {
    const messages = await PixMessage.findAll({
      where: {
        sent: false,
      },
      include: [
        {
          model: Person,
          as: 'recebedor',
        },
      ],
      limit: 10,
    })
    return messages.find((mensagem) => {
      if (mensagem.recebedor.ispb === ispbRecebedor) {
        return true
      }
      return false
    })
  }

  async update(messageId: string, newPixMessage: object): Promise<void> {
    await PixMessage.update(newPixMessage, {
      where: { id: messageId },
    })
  }
}

const pixMessageRespositoryInstance = new PixMessageRepository()

export default pixMessageRespositoryInstance
