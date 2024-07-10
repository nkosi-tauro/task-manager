export const createTaskSchema = {
  type: 'object',
  required: ['title', 'description', 'dueDate', 'priority', 'status'],
  properties: {
    title: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    dueDate: {
      type: 'string',
      format: 'date-time',
    },
    priority: {
      type: 'string',
    },
    status: {
      type: 'string',
    },
  },
}

export const updateTaskSchema = {
  type: 'object',
  // required: ['title'],
  properties: {
    title: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    dueDate: {
      type: 'string',
      format: 'date-time',
    },
    priority: {
      type: 'string',
    },
    status: {
      type: 'string',
    },
  },
}