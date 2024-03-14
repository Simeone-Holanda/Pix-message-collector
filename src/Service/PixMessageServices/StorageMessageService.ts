import { v4 as uuidv4 } from 'uuid'
import { IPixMessageRepository } from '../../repositories/interfaces/IPixMessage'
import pixMessageRespositoryInstance from '../../repositories/implementations/PixMessageRespository'

class StoreMessageService {
  private readonly pixMessageRepository: IPixMessageRepository
  constructor(pixMessageRepository: IPixMessageRepository) {
    this.pixMessageRepository = pixMessageRepository
  }

  generateRandomMessage(ispb: string) {
    const randomId = uuidv4()
    return {
      id: randomId,
      endToEndId: 'E' + randomId.substring(1),
      valor: Math.random() * 1000,
      pagador: this.generateRandomPerson(),
      recebedor: this.generateRandomPerson(ispb),
      campoLivre: 'Informações adicionais',
      txId: 'TX' + randomId.substring(1),
      dataHoraPagamento: new Date(),
      sent: false,
    }
  }

  generateRandomPerson(ispb?: string) {
    const randomSequence = uuidv4()
    return {
      nome: `${ispb ? 'Recebedor' : 'Pagador'} - ` + randomSequence,
      cpfCnpj: randomSequence.slice(0, 11),
      ispb: ispb || randomSequence.slice(0, 8),
      agencia: randomSequence.slice(0, 4),
      contaTransacional: randomSequence.slice(0, 6),
      tipoConta: randomSequence.slice(0, 4),
    }
  }

  execute(ispb: string, quantity: string) {
    for (let index = 0; index < parseInt(quantity); index++) {
      this.pixMessageRepository.save(this.generateRandomMessage(ispb))
    }
  }
}

const storeMessageServiceInstance = new StoreMessageService(
  pixMessageRespositoryInstance,
)

// export default connectionStreamService
export { StoreMessageService, storeMessageServiceInstance }
