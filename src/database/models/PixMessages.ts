import { DataTypes } from 'sequelize'
import {
  Table,
  Column,
  ForeignKey,
  AllowNull,
  DataType,
  Default,
  PrimaryKey,
  Model,
} from 'sequelize-typescript'
import Person from './Person'
// import { Person } from './Person'

@Table({ tableName: 'Pixmessages' })
// eslint-disable-next-line no-use-before-define
class PixMessage extends Model<PixMessage> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @AllowNull(false)
  @Column(DataType.UUID)
  id!: string

  @Column({ type: DataTypes.STRING(100), allowNull: false })
  endToEndId!: string

  @Column({ type: DataTypes.DOUBLE, allowNull: false })
  valor!: number

  @ForeignKey(() => Person)
  @Column({ type: DataTypes.UUID, allowNull: false })
  pagadorId!: string

  @ForeignKey(() => Person)
  @Column({ type: DataTypes.UUID, allowNull: false })
  recebedorId!: string

  @Column({ type: DataTypes.STRING(4), allowNull: false })
  campoLivre!: string

  @Column({ type: DataTypes.STRING(6), allowNull: false })
  txId!: string

  @Column({ type: DataTypes.DATE, allowNull: false })
  dataHoraPagamento!: Date

  @Column({ type: DataTypes.BOOLEAN, allowNull: false })
  sent!: boolean

  @Column({ type: DataTypes.DATE, allowNull: false })
  createdAt!: Date

  @Column({ type: DataTypes.DATE, allowNull: false })
  updatedAt!: Date
}

export default PixMessage
