import { FastifyInstance } from "fastify";
import { createTaskHandler, getAllUserTasksHandler } from "./task.controller";
import { createTaskSchema } from "./task.schema";

async function taskRoutes(server: FastifyInstance) {

  server.post("/", {
    schema: {
      body: createTaskSchema
    },
    onRequest: [server.authenticate],
  }, createTaskHandler)

  server.get("/", {
    onRequest: [server.authenticate],
  }, getAllUserTasksHandler)
}

export default taskRoutes