import fastify from "fastify";
import sequelize from "../database/connection";

export async function createServer() {
  const server = fastify({
    logger: true
  });

  //dummy Health check endpoint (update)
  server.get('/health', async (request, reply) => {
    return { status: 'ok' };
  });

  return server;
}