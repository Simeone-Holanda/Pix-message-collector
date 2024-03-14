import { Request, Response } from 'express'
import {
  // ConnectionStreamService,
  FindAllMessageServices,
  StoreMessageService,
} from '../../Service/PixMessageServices'
// import HttpError from '../../Errors/httpError'

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

export const FindAllMessagesController = async (
  request: Request,
  response: Response,
): Promise<Response> => {
  const messages = await FindAllMessageServices()
  return response.status(200).json(messages)
}

// export const ConnectionStreamController = async (
//   request: Request,
//   response: Response,
// ): Promise<Response> => {
//   try {
//     const { ispb } = request.params

//     let responseOne = false
//     if (request.headers.accept && request.headers.accept === 'multipart/json') {
//       responseOne = false
//     }
//     if (
//       !request.headers.accept ||
//       request.headers.accept === 'application/json'
//     ) {
//       responseOne = true
//     }
//     const responseMessage = ConnectionStreamService(ispb, responseOne)
//     response.setHeader(
//       'Pull-Next',
//       `/api/pix/${ispb}/stream/${responseMessage?.interationId}`,
//     )
//     if (!responseMessage?.message && !responseMessage?.messages?.length)
//       return response.status(204).json({ message: 'No content' })
//     return response
//       .status(200)
//       .json(responseOne ? responseMessage.message : responseMessage.messages)
//   } catch (error) {
//     console.log(error)
//     if (error instanceof HttpError) {
//       return response.status(error.statusCode).send({
//         message: error.message,
//       })
//     } else {
//       return response.status(500).json({
//         message:
//           'An internal server error has occurred, contact the developer. ',
//       })
//     }
//   }
// }
