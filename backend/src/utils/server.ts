import fastify, { FastifyReply, FastifyRequest } from 'fastify'
import { logger } from './logger'
import userRoutes from '../modules/user/user.route'
import fastifyPrintRoutes from 'fastify-print-routes'
import fastifyJwt from '@fastify/jwt'
import taskRoutes from '../modules/tasks/task.route'
import labelRoutes from '../modules/labels/label.route'

export async function createServer () {
  const server = fastify({
    logger
  })
  // For Testing
  await server.register(fastifyPrintRoutes)

  // JWT
  server.register(fastifyJwt, {
    secret: process.env.JWT_SECRET || 'verysecretsecret'
  })
  server.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const token = request.headers.authorization?.split(' ')[1]
      if (!token) {
        return await reply.code(401).send({ error: 'No token provided' })
      }
      const decoded = await request.jwtVerify()
      // set req user to the decoded token data
      request.user = decoded
    } catch (err) {
      reply.send(err)
    }
  })

  // Routes
  server.register(userRoutes, { prefix: '/api/users' })
  server.register(taskRoutes, { prefix: '/api/tasks' })
  server.register(labelRoutes, { prefix: '/api/labels' })

  // Dummy Health check endpoint
  server.get('/health', async () => {
    return { status: 'ok' }
  })

  return await server
}
