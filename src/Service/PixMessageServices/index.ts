import { v4 as uuidv4 } from 'uuid'
import HttpError from '../../Errors/httpError'

// Banco de dados em memória(Temporárel)
const messages = []
const interactionsId = []

export const StoreMessageService = async (ispb: string, number: string) => {
  for (let index = 0; index < parseInt(number); index++) {
    messages.push(generateRandomMessage(ispb))
  }
}

export const FindAllMessageServices = async () => {
  return messages
}

// Função para gerar uma mensagem Pix aleatória
function generateRandomMessage(ispb: string) {
  const randomId = uuidv4()
  return {
    id: randomId,
    endToEndId: 'E' + randomId.substring(1),
    valor: Math.random() * 1000,
    pagador: generateRandomPerson(),
    recebedor: generateRandomPerson(ispb),
    campoLivre: 'Informações adicionais',
    txId: 'TX' + randomId.substring(1),
    dataHoraPagamento: new Date(),
    sent: false,
  }
}
function generateRandomPerson(ispb?: string) {
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

export function ConnectionStreamService(ispb: string, responseOne: boolean) {
  const interationId = uuidv4().slice(0, 15)
  // verificando é possível se conectar
  if (interactionsId.length > 6)
    throw new HttpError('The maximum flow limit has been exceeded. ', 429)
  interactionsId.push(interationId)
  if (responseOne) {
    const message = messages.find((m) => m.recebedor.ispb === ispb && !m.sent)
    UpdateMessage(message)
    return { message, interationId }
  } else {
    const responseMessages = messages
      .filter((m) => m.recebedor.ispb === ispb && !m.sent)
      .slice(0, 10)
    responseMessages.map((rm) => UpdateMessage(rm))
    return {
      messages: responseMessages,
      interationId,
    }
  }
}

const UpdateMessage = (message) => {
  if (!message) return
  const messageIndex = messages.findIndex((m) => m.id === message.id)
  messages[messageIndex].sent = true
}
