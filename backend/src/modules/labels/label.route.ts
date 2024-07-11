import { FastifyInstance } from 'fastify'
import { addLabelToTaskHandler, createLabelHandler, getAllLabelsHandler } from './label.controller'
import { addLabelToTaskSchema, createLabelSchema } from './label.schema'

async function labelRoutes (server: FastifyInstance) {
  server.post('/addLabel', {
    schema: {
      body: createLabelSchema
    },
    onRequest: [server.authenticate]
  }, createLabelHandler)

  server.get('/', {
    onRequest: [server.authenticate]
  }, getAllLabelsHandler)

  server.post('/addLabelToTask', {
    schema: {
      body: addLabelToTaskSchema
    },
    onRequest: [server.authenticate]
  }, addLabelToTaskHandler)
}

export default labelRoutes
