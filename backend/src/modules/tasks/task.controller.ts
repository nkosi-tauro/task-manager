import { FastifyRequest, FastifyReply } from "fastify";
import { createTask, getAllTasksBelongingToUser, getAllTasks, getTaskById, updateTask, deleteTask, assignTask, updateTaskStatus } from "./task.services";

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
    const { status, sortBy, sortOrder } = request.query as any;

    const filters = {};
    if (status) {
      (filters as any).status = status;
    }

    const sort = {};
    if (sortBy) {
      (sort as any).field = sortBy;
    }
    if (sortOrder) {
      (sort as any).order = sortOrder;
    }

    const tasks = await getAllTasks(filters, sort);
    return reply.code(200).send(tasks);
  } catch (error) {
    return reply.code(500).send({ error: "Tasks not found" });
  }
}

export async function getTaskByIdHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const params = request.params as { id: string };
    const task = await getTaskById(params.id);
    return reply.code(200).send(task);
  }
  catch (error) {
    return reply.code(404).send({ error: "Task not found" });
  }
}

export async function updateTaskHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const params = request.params as { id: string };
    const updateData = request.body as { title: string, description: string, dueDate: Date, priority: string, status: string };
    const updatedTask = await updateTask(params.id, updateData);
    return reply.code(200).send(updatedTask);
  } catch (error) {
    console.log(error)
    return reply.code(500).send({ error: "Failed to update task" });
  }
}

export async function deleteTaskHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const params = request.params as { id: string };
    await deleteTask(params.id);
    return reply.code(204).send({ message: "Task deleted successfully" });
  } catch (error) {
    return reply.code(500).send({ error: "Failed to delete task" });
  }
}

export async function assignTaskHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const params = request.params as { id: string };
    const { userId } = request.body as { userId: string };
    const updatedTask = await assignTask(params.id, userId);
    return reply.code(200).send(updatedTask);
  } catch (error) {
    return reply.code(500).send({ error: "Failed to assign task" });
  }
}

export async function updateTaskStatusHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const params = request.params as { id: string };
    const { status } = request.body as { status: string };
    const updatedTask = await updateTaskStatus(params.id, status);
    return reply.code(200).send(updatedTask);
  } catch (error) {
    return reply.code(500).send({ error: "Failed to update task status" });
  }
}

