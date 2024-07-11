import { User } from '../../database/models/User'
import { CreationAttributes } from 'sequelize'
import bcrypt from 'bcrypt'

const saltRounds = 10

export async function createUser (input: CreationAttributes<User>) {
  try {
    const salt = await bcrypt.genSalt(saltRounds)
    const hash = await bcrypt.hash(input.password, salt)
    const user = await User.create({ ...input, password: hash })
    return user
  } catch (error) {
    throw new Error(`Error creating user: ${error}`)
  }
}

export async function getAllUsers () {
  try {
    const users = await User.findAll()
    return users
  } catch (error) {
    throw new Error(`Error getting users: ${error}`)
  }
}

export async function findUserByEmail (email: string) {
  try {
    const user = await User.findOne({ where: { email } })
    return user
  } catch (error) {
    throw new Error(`Error finding user: ${error}`)
  }
}
