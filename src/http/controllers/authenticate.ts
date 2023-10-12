import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { InvalidCretendialsError } from "../use-cases/errors/invalid-credentials-error"
import { makeAuthenticateUseCase } from "../use-cases/factories/make-authenticate-use-case"


export async function authenticate(request: FastifyRequest, reply: FastifyReply) {

  const BodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
  })

  const { email, password } = BodySchema.parse(request.body)

  const { useCase } = makeAuthenticateUseCase()

  try {
    await useCase.execute({ 
      email, 
      password
    })
  }
  catch (err) {
    if( err instanceof InvalidCretendialsError){
     return reply.status(400).send(err.message)
    }
    
    // O Fastify tem uma tratativa de erro global em casos que não tratamos.
    throw err
  }
  return reply.status(200).send()
}