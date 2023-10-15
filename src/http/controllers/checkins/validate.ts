import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { makeCheckinUseCase } from "@src/use-cases/factories/make-checkin-use-case"
import { makeValidateCheckinUseCase } from "@src/use-cases/factories/make-validate-checkin-use-case"


export async function validate(request: FastifyRequest, reply: FastifyReply) {

  const validateCheckinParamsSchema = z.object({
    checkinId: z.string().uuid()
  })


  const { checkinId } = validateCheckinParamsSchema.parse(request.params)
  const { sub: userId } = request.user

  const { useCase } = makeValidateCheckinUseCase()


  await useCase.execute({
    checkinId
  })


  return reply.status(204).send()
}