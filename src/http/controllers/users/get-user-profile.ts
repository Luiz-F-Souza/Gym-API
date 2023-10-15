import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const requestSchema = z.object({
  userId: z.string().uuid()
})
export async function getUserProfile(request: FastifyRequest, reply: FastifyReply){
  

}