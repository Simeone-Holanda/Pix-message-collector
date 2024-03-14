import { IPixMessageRepository } from '../../repositories/interfaces/IPixMessage'
import pixMessageRespositoryInstance from '../../repositories/implementations/PixMessageRespository'

// export function ConnectionStreamService(ispb: string, responseOne: boolean) {}

class FindAllMessageServices {
  private readonly pixMessageRepository: IPixMessageRepository

  constructor(pixMessageRepository: IPixMessageRepository) {
    this.pixMessageRepository = pixMessageRepository
  }

  execute() {
    return this.pixMessageRepository.findAll()
  }
}

const findAllMessageServicesInstance = new FindAllMessageServices(
  pixMessageRespositoryInstance,
)

// export default connectionStreamService
export { FindAllMessageServices, findAllMessageServicesInstance }
