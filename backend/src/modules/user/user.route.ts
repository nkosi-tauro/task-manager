import { FastifyInstance } from 'fastify'
import { createUserHandler, getUsersHandler, loginHandler } from './user.controller'
import { createUserSchema, loginSchema } from './user.schema'

async function userRoutes (server: FastifyInstance) {
  server.post('/', {
    schema: {
      body: createUserSchema
    }
  }, createUserHandler)

  server.post('/login', {
    schema: {
      body: loginSchema
    }
  }, loginHandler)

  server.get('/', {
    onRequest: [server.authenticate]
  }, getUsersHandler)
}

export default userRoutes
