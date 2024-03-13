import { v4 as uuidv4 } from 'uuid'
// Banco de dados em memória(Temporárel)
const messages = []

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
