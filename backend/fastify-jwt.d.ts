// fastify-jwt.d.ts
import fastify from 'fastify'

declare module 'fastify' {
  interface FastifyInstance extends
    FastifyJwtNamespace<{ namespace: 'security' }> {
    authenticate: (request: fastify.FastifyRequest, reply: fastify.FastifyReply) => Promise<void>
  }
}
