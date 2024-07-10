import { FastifyInstance } from "fastify";
import { createTaskHandler, getAllUserTasksHandler, getAllTasksHandler, getTaskByIdHandler, updateTaskHandler, deleteTaskHandler } from "./task.controller";
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

  //get task by id
  server.get("/:id", {
    onRequest: [server.authenticate],
  }, getTaskByIdHandler)

  //update task by id
  server.put("/update/:id", {
    onRequest: [server.authenticate],
  }, updateTaskHandler)

  //delete task by id
  server.delete("/delete/:id", {
    onRequest: [server.authenticate],
  }, deleteTaskHandler)
}

export default taskRoutes