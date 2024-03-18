import { DataTypes } from 'sequelize'
import {
  Model,
  Column,
  Table,
  AllowNull,
  DataType,
  Default,
  PrimaryKey,
  HasMany,
} from 'sequelize-typescript'
import PixMessage from './PixMessages'

@Table({ tableName: 'Persons' })
// eslint-disable-next-line no-use-before-define
class Person extends Model<Person> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @AllowNull(false)
  @Column(DataType.UUID)
  id!: string

  @Column({ type: DataTypes.STRING(100), allowNull: false })
  nome!: string

  @Column({ type: DataTypes.STRING(14), allowNull: false })
  cpfCnpj!: string

  @Column({ type: DataTypes.STRING(8), allowNull: false })
  ispb!: string

  @Column({ type: DataTypes.STRING(4), allowNull: false })
  agencia!: string

  @Column({ type: DataTypes.STRING(6), allowNull: false })
  contaTransacional!: string

  @Column({ type: DataTypes.STRING(4), allowNull: false })
  tipoConta!: string

  @Column({ type: DataTypes.DATE, allowNull: false })
  createdAt!: Date

  @Column({ type: DataTypes.DATE, allowNull: false })
  updatedAt!: Date

  @HasMany(() => PixMessage, 'pagadorId')
  pagador: PixMessage[]

  @HasMany(() => PixMessage, 'recebedorId')
  recebedor: PixMessage[]
}

export default Person
