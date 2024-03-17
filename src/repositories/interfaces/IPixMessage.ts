import IPixMessage from '../../Interfaces/PixMessageModel'
import PixMessage from '../../database/models/PixMessages'

export interface IPixMessageRepository {
  cacheMessage: string[]
  save(pixMessage: IPixMessage): Promise<PixMessage>
  findAll(
    ispbRecebedor?: string,
    limit?: number,
    sent?: boolean,
  ): Promise<PixMessage[]>
  findOne(ispbRecebedor: string): Promise<PixMessage>
  update(messageId: string, newPixMessage: object): Promise<void>
}
