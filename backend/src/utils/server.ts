import fastify from "fastify";
import { logger } from "./logger";
import userRoutes from "../modules/user/user.route";
import fastifyPrintRoutes from "fastify-print-routes";

export async function createServer() {
  const server = fastify({
    logger,
    
  });
  // For Testing
  await server.register(fastifyPrintRoutes)

  server.register(userRoutes, { prefix: "/api/users" });

  //Health check endpoint (update)
  server.get('/health', async () => {
    return { status: 'ok' };
  });

  return server;
}