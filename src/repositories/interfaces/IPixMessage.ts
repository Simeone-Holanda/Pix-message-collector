import IPixMessage from '../../Interfaces/PixMessageModel'
import PixMessage from '../../database/models/PixMessages'

export interface IPixMessageRepository {
  save(pixMessage: IPixMessage): Promise<PixMessage>
  findAll(
    ispbRecebedor?: string,
    limit?: number,
    sent?: boolean,
  ): Promise<PixMessage[]>
  findOne(ispbRecebedor: string): IPixMessage
  update(messageId: string, newPixMessage: object): IPixMessage
}
