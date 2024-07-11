// ignore
// import { createServer } from '../utils/server';
// import sequelizeConnection from '../database/connection';
// import supertest, { SuperTest, Test } from 'supertest';
// import { FastifyInstance } from 'fastify';

// let app: FastifyInstance;
// let request: SuperTest<Test>;
// let token: string;

// beforeAll(async () => {
//   await sequelizeConnection.sync({ force: true });
//   (app as any) = await createServer();
//   await app.listen({ host: '0.0.0.0', port: 3000 });
//   (request as any) = supertest(app.server);

//   // Create a user and log in to get the token
//   await request.post('/createUser').send({
//     email: 'testuser@example.com',
//     password: 'password123',
//   });

//   const loginResponse = await request.post('/login').send({
//     email: 'testuser@example.com',
//     password: 'password123',
//   });

//   token = loginResponse.body.token;
// });

// afterAll(async () => {
//   await sequelizeConnection.close();
//   await app.close();
// });

// export { request, token };
