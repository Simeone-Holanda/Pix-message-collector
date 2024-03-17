import IPixMessage from '../../Interfaces/PixMessageModel'
import Person from '../../database/models/Person'
import PixMessage from '../../database/models/PixMessages'

import { IPixMessageRepository } from '../interfaces/IPixMessage'

export class PixMessageRepository implements IPixMessageRepository {
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
    if (!ispbRecebedor && !limit && !sent) {
      return await PixMessage.findAll({
        where: {
          sent: false,
        },
      })
    } else if (ispbRecebedor && sent != null) {
      return await PixMessage.findAll({
        where: {
          sent: false,
        },
        include: [
          {
            model: Person,
            as: 'recebedor',
            where: { ispb: ispbRecebedor },
            required: false,
          },
        ],
        limit,
      })
    } else {
      return await PixMessage.findAll({
        where: {
          sent: false,
        },
        include: [
          {
            model: Person,
            where: { ispb: ispbRecebedor },
            required: false,
          },
        ],
        limit,
      })
    }
  }

  async findOne(ispbRecebedor: string, sent?: boolean): Promise<PixMessage> {
    if (sent !== null)
      return await PixMessage.findOne({
        where: {
          sent: false,
        },
        include: [
          {
            model: Person,
            as: 'recebedor',
            where: { ispb: ispbRecebedor },
            required: false,
          },
        ],
      })
    return await PixMessage.findOne({
      where: {
        sent: false,
      },
      include: [
        {
          model: Person,
          where: { ispb: ispbRecebedor },
          required: false,
        },
      ],
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
