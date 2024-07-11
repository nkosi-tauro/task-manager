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

// Test User Creation
describe('POST /api/users', () => {
  it('should create a new user', async () => {
    const response = await request.post('/api/users').send({
      email: 'testuser@example.com',
      password: 'password123'
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.email).toBe('testuser@example.com');
  });
});

// Test User Login
describe('POST /api/users/login', () => {
  it('should log in a user and return a JWT token', async () => {
    await request.post('/api/users').send({
      email: 'testuser@example.com',
      password: 'password123'
    });
    const response = await request.post('/api/users/login').send({
      email: 'testuser@example.com',
      password: 'password123'
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
});
