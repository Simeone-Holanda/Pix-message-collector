import { Request, Response } from 'express'
import { StoreMessageService } from '../../Service/PixMessageServices'

export const StoreMessageController = async (
  request: Request,
  response: Response,
): Promise<Response> => {
  const { ispb, number } = request.params
  await StoreMessageService(ispb, number)
  return response
    .status(201)
    .json({ message: 'Mensagens PIX adicionadas com sucesso.' })
}
