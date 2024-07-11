import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  BelongsTo,
  ForeignKey
} from 'sequelize-typescript'
import { Task } from './Task'
import { Label } from './Label'

@Table({
  timestamps: true,
  tableName: 'task_labels',
  modelName: 'TaskLabel'
})
export class TaskLabel extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4
  })
  declare id: string

  @ForeignKey(() => Task)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  declare taskId: string

  @BelongsTo(() => Task)
  declare task: Task

  @ForeignKey(() => Label)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  declare labelId: string

  @BelongsTo(() => Label)
  declare label: Label

  @CreatedAt
  declare createdAt: Date

  @UpdatedAt
  declare updatedAt: Date
}

export default TaskLabel
