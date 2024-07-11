import { CreationAttributes } from 'sequelize'
import { Task } from '../../database/models/Task'

async function getTaskByPrimaryKey (taskId: string) {
  const task = await Task.findByPk(taskId)
  if (task == null) throw new Error('Task not found')
  return task
}

export async function createTask (input: CreationAttributes<Task>) {
  try {
    const task = await Task.create(input)
    return task
  } catch (error) {
    throw new Error(`Error creating task: ${error}`)
  }
}

export async function getAllTasksBelongingToUser (userId: string) {
  try {
    const tasks = await Task.findAll({ where: { userId } })
    return tasks
  } catch (error) {
    throw new Error(`Error getting tasks: ${error}`)
  }
}

export async function getAllTasks (filters: any = {}, sort: any = {}) {
  try {
    const tasks = await Task.findAll({
      where: {
        ...filters
      },
      order: [[sort.field || 'createdAt', sort.order || 'ASC']]
    })
    return tasks
  } catch (error) {
    throw new Error(`Error getting tasks: ${error}`)
  }
}

export async function getTaskById (taskId: string) {
  try {
    const task = await Task.findOne({ where: { id: taskId } })
    return task
  } catch (error) {
    throw new Error(`Error getting task: ${error}`)
  }
}

export async function updateTask (taskId: string, updateData: Partial<Task>) {
  try {
    const task = await getTaskByPrimaryKey(taskId)
    const updatedTask = await task.update(updateData)
    return updatedTask
  } catch (error) {
    throw new Error(`Error updating task: ${error}`)
  }
}

export async function deleteTask (taskId: string) {
  try {
    const task = await getTaskByPrimaryKey(taskId)
    await task.destroy()
  } catch (error) {
    throw new Error(`Error deleting task: ${error}`)
  }
}

export async function assignTask (taskId: string, userId: string) {
  try {
    const task = await getTaskByPrimaryKey(taskId)
    task.userId = userId
    await task.save()
    return task
  } catch (error) {
    throw new Error(`Error assigning task: ${error}`)
  }
}

export async function updateTaskStatus (taskId: string, status: string) {
  try {
    const task = await getTaskByPrimaryKey(taskId)
    task.status = status
    await task.save()
    return task
  } catch (error) {
    throw new Error(`Error updating task status: ${error}`)
  }
}
