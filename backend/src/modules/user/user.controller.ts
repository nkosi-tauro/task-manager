import { FastifyReply, FastifyRequest } from 'fastify'
import { createUser, findUserByEmail, getAllUsers } from './user.services'
import bcrypt from 'bcrypt'

export async function createUserHandler (request: FastifyRequest, reply: FastifyReply) {
  try {
    const user = await createUser(request.body as { email: string, password: string })
    return await reply.code(201).send(user)
  } catch (error: any) {
    if (error.message.includes('Validation error')) {
      return await reply.code(400).send({ error: 'User already exists' })
    } else {
      return await reply.code(500).send({ error: error.message })
    }
  }
}

export async function getUsersHandler (request: FastifyRequest, reply: FastifyReply) {
  try {
    const user = await getAllUsers()
    return await reply.code(200).send(user)
  } catch (error) {
    return await reply.code(404).send({ error: 'User not found' })
  }
}

export async function loginHandler (request: FastifyRequest, reply: FastifyReply) {
  try {
    const { email, password } = request.body as { email: string, password: string }

    const user = await findUserByEmail(email)
    if (user == null) {
      return await reply.code(404).send({ error: 'Invalid email or password' })
    }

    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
      return await reply.code(400).send({ error: 'Invalid email or password' })
    }

    const token = await reply.jwtSign({ id: user.id, email: user.email })
    return await reply.code(200).send({ token })
  } catch (error) {
    return await reply.code(400).send({ error: 'An error occurred while logging in' })
  }
}
