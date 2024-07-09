import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import { User } from "./User";

@Table({
  timestamps: true,
  tableName: "tasks",
  modelName: "Task",
})
export class Task extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare description: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  declare dueDate: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare priority: string;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare userId: string;

  @BelongsTo(() => User)
  declare owner: User;
}
