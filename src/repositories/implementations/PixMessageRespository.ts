import IPixMessage from '../../Models/PixMessageModel'

import { IPixMessageRepository } from '../interfaces/IPixMessage'

export class PixMessageRepository implements IPixMessageRepository {
  pixMessages: IPixMessage[] = []

  save(pixMessage: IPixMessage): void {
    this.pixMessages.push(pixMessage)
  }

  findAll(
    ispbRecebedor?: string,
    limit?: number,
    sent?: boolean,
  ): IPixMessage[] {
    if (!ispbRecebedor && !limit && !sent) {
      return this.pixMessages
    } else if (ispbRecebedor && sent != null) {
      return this.pixMessages
        .filter(
          (message) =>
            message.recebedor.ispb === ispbRecebedor && !message.sent,
        )
        .slice(0, limit)
    } else {
      return this.pixMessages
        .filter(
          (message) =>
            message.recebedor.ispb === ispbRecebedor && !message.sent,
        )
        .slice(limit)
    }
  }

  findOne(ispbRecebedor: string, sent?: boolean): IPixMessage {
    if (sent !== null) {
      return this.pixMessages.find(
        (message) => message.recebedor.ispb === ispbRecebedor && !message.sent,
      )
    }
    return this.pixMessages.find(
      (message) => message.recebedor.ispb === ispbRecebedor,
    )
  }

  update(messageId: string, newPixMessage: object): IPixMessage {
    const messageIndex = this.pixMessages.findIndex(
      (message: IPixMessage) => message.id === messageId,
    )
    this.pixMessages[messageIndex] = Object.assign(
      this.pixMessages[messageIndex],
      newPixMessage,
    )
    return this.pixMessages[messageIndex]
  }
}

const pixMessageRespositoryInstance = new PixMessageRepository()

export default pixMessageRespositoryInstance
