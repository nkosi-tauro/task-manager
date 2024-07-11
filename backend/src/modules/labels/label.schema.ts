export const createLabelSchema = {
  type: 'object',
  required: ['name'],
  properties: {
    name: {
      type: 'string',
    },
  },
}

export const addLabelToTaskSchema = {
  type: 'object',
  required: ['taskId', 'labelId'],
  properties: {
    taskId: {
      type: 'string',
    },
    labelId: {
      type: 'string',
    },
  },
};