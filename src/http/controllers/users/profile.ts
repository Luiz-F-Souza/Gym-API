import { FastifyReply, FastifyRequest } from "fastify"
import { makeGetUserProfileUseCase } from "@src/use-cases/factories/make-get-user-profile-use-case"



export async function profile(request: FastifyRequest, reply: FastifyReply) {

  const { useCase } = makeGetUserProfileUseCase()

  const userId = request.user.sub

  const { user } = await useCase.execute({
    userId
  })


  return reply.status(200).send({
    data: {
      user: {
        ...user,
        password_hash: undefined
      }
    }
  })
}