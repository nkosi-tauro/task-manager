import { FastifyInstance } from "fastify";
import { createUserHandler } from "./user.controller";
import { createUserSchema } from "./user.schema";

async function userRoutes(server: FastifyInstance) {

  server.post("/", {
    schema: {
      body: createUserSchema,
    }
  }, createUserHandler)
}

export default userRoutes