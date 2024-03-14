import IPixMessage from '../../Models/PixMessageModel'

export interface IPixMessageRepository {
  save(pixMessage: IPixMessage): void
  findAll(ispbRecebedor: string, limit: number, sent: boolean): IPixMessage[]
  findOne(ispbRecebedor: string): IPixMessage
  update(messageId: string, newPixMessage: object): IPixMessage
}
