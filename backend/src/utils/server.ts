import fastify from "fastify";

export async function createServer() {
  const server = fastify({
    logger: true
  });

  return server;
}