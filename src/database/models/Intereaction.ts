import { DataTypes } from 'sequelize'
import {
  Table,
  Column,
  AllowNull,
  DataType,
  Default,
  PrimaryKey,
  Model,
} from 'sequelize-typescript'

// Defina o modelo para a tabela Interactions
@Table({ tableName: 'Interactions' })
// eslint-disable-next-line no-use-before-define
class Interaction extends Model<Interaction> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @AllowNull(false)
  @Column(DataType.UUID)
  id!: string

  @Column({ type: DataTypes.STRING(8), allowNull: false })
  ispb!: string

  @Column({ type: DataTypes.DATE, allowNull: false })
  createdAt!: Date

  @Column({ type: DataTypes.DATE, allowNull: false })
  updatedAt!: Date
}

export default Interaction
