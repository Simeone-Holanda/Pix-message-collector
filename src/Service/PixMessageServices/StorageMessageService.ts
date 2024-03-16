import { v4 as uuidv4 } from 'uuid'
import { IPixMessageRepository } from '../../repositories/interfaces/IPixMessage'
import pixMessageRespositoryInstance from '../../repositories/implementations/PixMessageRespository'
import Person from '../../database/models/Person'
import IPixMessage from '../../Interfaces/PixMessageModel'

class StoreMessageService {
  private readonly pixMessageRepository: IPixMessageRepository
  constructor(pixMessageRepository: IPixMessageRepository) {
    this.pixMessageRepository = pixMessageRepository
  }

  async generateRandomMessage(ispb: string): Promise<IPixMessage> {
    const randomId = uuidv4()
    return {
      endToEndId: 'E' + randomId.substring(1),
      valor: Math.random() * 1000,
      pagador: (await this.generateRandomPerson()).id,
      recebedor: (await this.generateRandomPerson(ispb)).id,
      campoLivre: 'NADA',
      txId: 'TX' + randomId.slice(0, 4),
      dataHoraPagamento: new Date(),
      sent: false,
    }
  }

  async generateRandomPerson(ispb?: string): Promise<Person> {
    const randomSequence = uuidv4()
    return await Person.create({
      nome: `${ispb ? 'Recebedor' : 'Pagador'} - ` + randomSequence,
      cpfCnpj: randomSequence.slice(0, 11),
      ispb: ispb || randomSequence.slice(0, 8),
      agencia: randomSequence.slice(0, 4),
      contaTransacional: randomSequence.slice(0, 6),
      tipoConta: randomSequence.slice(0, 4),
    })
  }

  async execute(ispb: string, quantity: string) {
    for (let index = 0; index < parseInt(quantity); index++) {
      await this.pixMessageRepository.save(
        await this.generateRandomMessage(ispb),
      )
    }
  }
}

const storeMessageServiceInstance = new StoreMessageService(
  pixMessageRespositoryInstance,
)

// export default connectionStreamService
export { StoreMessageService, storeMessageServiceInstance }
