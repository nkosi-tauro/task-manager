import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { logger } from "./logger";
import userRoutes from "../modules/user/user.route";
import fastifyPrintRoutes from "fastify-print-routes";
import fastifyJwt from "@fastify/jwt";

export async function createServer() {
  const server = fastify({
    logger,  
  });
  // For Testing
  await server.register(fastifyPrintRoutes)

  //JWT
  server.register(fastifyJwt, {
    secret: process.env.JWT_SECRET || 'verysecretsecret',
  });
  server.decorate("authenticate", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });

  //User routes
  server.register(userRoutes, { prefix: "/api/users" });
  
  //Dummy Health check endpoint 
  server.get('/health', async () => {
    return { status: 'ok' };
  });

  return server;
}