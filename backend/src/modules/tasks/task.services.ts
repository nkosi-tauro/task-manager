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