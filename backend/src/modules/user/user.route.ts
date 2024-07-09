import { FastifyInstance } from "fastify";
import { createUserHandler, getUsersHandler } from "./user.controller";
import { createUserSchema } from "./user.schema";

async function userRoutes(server: FastifyInstance) {

  server.post("/", {
    schema: {
      body: createUserSchema,
    }
  }, createUserHandler)

  server.get("/", getUsersHandler)
}

export default userRoutes