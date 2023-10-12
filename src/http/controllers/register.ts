import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { EmailAlreadyRegistered } from "../use-cases/errors/register-errors"
import { makeRegisterUseCase } from "../use-cases/factories/make-register-use-case"


export async function register(request: FastifyRequest, reply: FastifyReply) {

  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  const { useCase } = makeRegisterUseCase()
  
  try {
    await useCase.execute({
      name,
      email,
      password
    })
  }
  catch (err) {
    if (err instanceof EmailAlreadyRegistered) {
      return reply.status(409).send(err.message)
    }

    // O Fastify tem uma tratativa de erro global em casos que não tratamos.
    throw err
  }
  return reply.status(201).send()
}