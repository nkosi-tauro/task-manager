import 'dotenv/config'
import { Sequelize } from 'sequelize-typescript'
import { User } from './models/User'
import { Task } from './models/Task'
import { Label } from './models/Label'
import { TaskLabel } from './models/TaskLabel'

const sequelizeConnection = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  models: [User, Task, Label, TaskLabel]
})

export default sequelizeConnection
