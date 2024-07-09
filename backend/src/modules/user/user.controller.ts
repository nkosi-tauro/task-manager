import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUser } from "./user.services";

export async function createUserHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const user = await CreateUser(request.body as {email: string, password: string});
    return reply.code(201).send(user);
  } catch (error) {
    return reply.code(500).send({ error: "An error occurred while creating the user." });
  }
}