import { Label } from '../../database/models/Label'
import { TaskLabel } from '../../database/models/TaskLabel'

export async function createLabel (name: string) {
  try {
    const label = await Label.create({ name })
    return label
  } catch (error) {
    throw new Error(`Error creating label: ${error}`)
  }
}

export async function getAllLables () {
  try {
    const labels = await Label.findAll()
    return labels
  } catch (error) {
    throw new Error(`Error getting labels: ${error}`)
  }
}

export async function addLabelToTask (taskId: string, labelId: string) {
  try {
    const taskLabel = await TaskLabel.create({ taskId, labelId })
    return taskLabel
  } catch (error) {
    throw new Error(`Error adding label to task: ${error}`)
  }
}
