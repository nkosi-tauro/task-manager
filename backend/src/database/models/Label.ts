import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey
} from 'sequelize-typescript'

@Table({
  timestamps: false,
  tableName: 'labels',
  modelName: 'Label'
})
export class Label extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4
  })
  declare id: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare name: string
}

export default Label
