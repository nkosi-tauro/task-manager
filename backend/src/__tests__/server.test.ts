import supertest, { SuperTest, Test } from 'supertest';
import { createServer } from '../utils/server';
import { FastifyInstance } from 'fastify';

let app: FastifyInstance;
let request: SuperTest<Test>;

beforeAll(async () => {
  (app as any) = await createServer();
  await app.listen({
    host: '0.0.0.0',
    port: 3000
  });
  (request as any) = supertest(app.server);
});

afterAll(async () => {
  await app.close();
});

describe('GET /health', () => {
  it('responds with status 200', async () => {
    const response = await request.get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
  }, 10000);
});
