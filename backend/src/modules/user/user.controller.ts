import { FastifyReply, FastifyRequest } from "fastify";
import { createUser } from "./user.services";

export async function createUserHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const user = await createUser(request.body as {email: string, password: string});
    return reply.code(201).send(user);
  } catch (error : any) {
    if (error.message.includes("Validation error")) {
      return reply.code(400).send({ error: "User already exists" });
    } else {
      return reply.code(500).send({ error: error.message });
    }
  }
}