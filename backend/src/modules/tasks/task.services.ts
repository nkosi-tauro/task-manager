import { CreationAttributes } from "sequelize";
import { Task } from "../../database/models/Task";


export async function createTask(input: CreationAttributes<Task>) {
  try{
    const task = await Task.create(input);
    return task;
  }
  catch(error) {
    throw new Error(`Error creating task: ${error}`);
  }
}

export async function getAllTasksBelongingToUser(userId: string) {
  try {
    const tasks = await Task.findAll({where: { userId }});
    return tasks;
  } 
  catch (error) {
    throw new Error(`Error getting tasks: ${error}`);
  }
}

export async function getAllTasks(){
  try {
    const tasks = Task.findAll();
    return tasks;
  }
  catch (error) {
    throw new Error(`Error getting tasks: ${error}`);
  }
}

export async function getTaskById(taskId: string) {
  try {
    const task = await Task.findOne({ where: { id: taskId } });
    return task;
  } 
  catch (error) {
    throw new Error(`Error getting task: ${error}`);
  }
}

export async function updateTask(taskId: string, updateData: Partial<Task>) {
  try {
    const task = await Task.findByPk(taskId);
    if (!task) throw new Error("Task not found");
    const updatedTask = await task.update(updateData);
    return updatedTask;
  } catch (error) {
    throw new Error(`Error updating task: ${error}`);
  }
}
