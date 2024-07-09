import fastify from "fastify";
import sequelize from "../database/connection";
import { logger } from "./logger";

export async function createServer() {
  const server = fastify({
    logger,
    
  });

  //dummy Health check endpoint (update)
  server.get('/health', async (request, reply) => {
    return { status: 'ok' };
  });

  return server;
}