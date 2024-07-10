import { FastifyRequest, FastifyReply } from "fastify";
import { createTask, getAllTasksBelongingToUser, getAllTasks, getTaskById, updateTask } from "./task.services";

interface RequestUser {
  id: string,
  email: string,
  iat: Number
}

export async function createTaskHandler(request: FastifyRequest, reply: FastifyReply) {
  try{
    const user = request.user as RequestUser
    const task = await createTask({...request.body as { title: string, description: string, dueDate: Date, priority: string, status: string }, userId: user.id});
    return reply.code(201).send(task);
  }
  catch (error: any){
    return reply.code(500).send({ error: error.message });
  }
}

// Gets all the Tasks belonging to the authenticated user
export async function getAllUserTasksHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const user = request.user as RequestUser
    const tasks = await getAllTasksBelongingToUser(user.id);
    return reply.code(200).send(tasks);
  }
  catch (error) {
    return reply.code(404).send({ error: "Tasks not found" });
  }
}

// Gets all the created tasks regardless of user
export async function getAllTasksHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const tasks = await getAllTasks();
    return reply.code(200).send(tasks);
  }
  catch (error) {
    return reply.code(404).send({ error: "Tasks not found" });
  }
}

export async function getTaskByIdHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const params = request.params
    const task = await getTaskById((params as any).id);
    return reply.code(200).send(task);
  }
  catch (error) {
    return reply.code(404).send({ error: "Task not found" });
  }
}

export async function updateTaskHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const params = request.params
    const updateData = request.body as { title: string, description: string, dueDate: Date, priority: string, status: string };
    const updatedTask = await updateTask((params as any).id, updateData);
    return reply.code(200).send(updatedTask);
  } catch (error) {
    console.log(error)
    return reply.code(500).send({ error: "Failed to update task" });
  }
}
