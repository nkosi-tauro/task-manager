import { FastifyRequest, FastifyReply } from 'fastify'
import { addLabelToTask, createLabel, getAllLables } from './label.services'

export async function createLabelHandler (request: FastifyRequest, reply: FastifyReply) {
  try {
    const { name } = request.body as { name: string }
    const label = await createLabel(name)
    return await reply.code(201).send(label)
  } catch (error: any) {
    return await reply.code(500).send({ error: error.message })
  }
}

export async function getAllLabelsHandler (request: FastifyRequest, reply: FastifyReply) {
  try {
    const labels = await getAllLables()
    return await reply.code(200).send(labels)
  } catch (error) {
    return await reply.code(404).send({ error: 'Labels not found' })
  }
}

export async function addLabelToTaskHandler (request: FastifyRequest, reply: FastifyReply) {
  try {
    const { taskId, labelId } = request.body as { taskId: string, labelId: string }
    const taskLabel = await addLabelToTask(taskId, labelId)
    return await reply.code(201).send(taskLabel)
  } catch (error: any) {
    return await reply.code(500).send({ error: error.message })
  }
}
