interface IPixMessage {
  id?: string
  endToEndId: string
  valor: number
  pagador: string
  recebedor: string
  campoLivre: string
  txId: string
  dataHoraPagamento: Date
  sent: boolean
}

export default IPixMessage
