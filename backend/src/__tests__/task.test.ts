
import supertest, { SuperTest, Test } from 'supertest';
import { createServer } from '../utils/server';
import { FastifyInstance } from 'fastify';
import sequelizeConnection from '../database/connection';

let app: FastifyInstance;
let request: SuperTest<Test>;

beforeAll(async () => {
  await sequelizeConnection.sync({ force: true });
  (app as any) = await createServer();
  await app.listen({
    host: '0.0.0.0',
    port: 3000
  });
  (request as any) = supertest(app.server);
});

afterAll(async () => {
  await sequelizeConnection.close();
  await app.close();
});

describe('POST /api/tasks', () => {
  let token: string;

  beforeAll(async () => {
    await request.post('/api/users').send({
      email: 'testuser@example.com',
      password: 'password123'
    });

    const loginResponse = await request.post('/api/users/login').send({
      email: 'testuser@example.com',
      password: 'password123'
    });

    token = loginResponse.body.token;
  });

  it('should create a new task', async () => {
    const response = await request.post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'New Task',
        description: 'Task description',
        dueDate: new Date(),
        priority: 'high',
        status: 'open'
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe('New Task');
  });
});


describe('PUT /api/tasks/update/:id', () => {
  let token: string;
  let taskId: string;

  beforeAll(async () => {
    await request.post('/api/users').send({
      email: 'testuser@example.com',
      password: 'password123'
    });

    const loginResponse = await request.post('/api/users/login').send({
      email: 'testuser@example.com',
      password: 'password123'
    });

    token = loginResponse.body.token;

    const taskResponse = await request.post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'New Task',
        description: 'Task description',
        dueDate: new Date(),
        priority: 'high',
        status: 'open'
      });

    taskId = taskResponse.body.id;
  });

  it('should update a task', async () => {
    const response = await request.put(`/api/tasks/update/${taskId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Updated Task',
        status: 'in progress'
      });

    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Updated Task');
    expect(response.body.status).toBe('in progress');
  });
});

describe('DELETE /api/tasks/delete/:id', () => {
  let token: string;
  let taskId: string;

  beforeAll(async () => {
    // Create and log in a user to get a token
    await request.post('/api/users').send({
      email: 'testuser@example.com',
      password: 'password123'
    });

    const loginResponse = await request.post('/api/users/login').send({
      email: 'testuser@example.com',
      password: 'password123'
    });

    token = loginResponse.body.token;

    const taskResponse = await request.post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'New Task',
        description: 'Task description',
        dueDate: new Date(),
        priority: 'high',
        status: 'open'
      });

    taskId = taskResponse.body.id;
  });

  it('should delete a task', async () => {
    const response = await request.delete(`/api/tasks/delete/${taskId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(204);
  });
});
