import { FastifyInstance } from "fastify";
import { createTaskHandler, getAllUserTasksHandler, getAllTasksHandler } from "./task.controller";
import { createTaskSchema } from "./task.schema";

async function taskRoutes(server: FastifyInstance) {

  //create tasks
  server.post("/", {
    schema: {
      body: createTaskSchema
    },
    onRequest: [server.authenticate],
  }, createTaskHandler)

  //get tasks that belong to authenticated user
  server.get("/", {
    onRequest: [server.authenticate],
  }, getAllUserTasksHandler)

  //get all tasks
  server.get("/all", {
    onRequest: [server.authenticate],
  }, getAllTasksHandler)
}

export default taskRoutes