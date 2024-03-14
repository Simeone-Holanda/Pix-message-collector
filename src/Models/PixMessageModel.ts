interface IPagador {
  nome: string
  cpfCnpj: string
  ispb: string
  agencia: string
  contaTransacional: string
  tipoConta: string
}

interface IRecebedor {
  nome: string
  cpfCnpj: string
  ispb: string
  agencia: string
  contaTransacional: string
  tipoConta: string
}

interface IPixMessage {
  id: string
  endToEndId: string
  valor: number
  pagador: IPagador
  recebedor: IRecebedor
  campoLivre: string
  txId: string
  dataHoraPagamento: Date
  sent: boolean
}

export default IPixMessage
