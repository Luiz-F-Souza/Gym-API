import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { makeFetchMemberCheckinsHistoryUseCase } from "@src/use-cases/factories/make-fetch-member-checkins-history-use-case"


export async function history(request: FastifyRequest, reply: FastifyReply) {

  const checkinHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1)
  })

  const { page } = checkinHistoryQuerySchema.parse(request.query)

  const { useCase } = makeFetchMemberCheckinsHistoryUseCase()


  const { checkins } = await useCase.execute({
    userId: request.user.sub,
    page
  })


  return reply.status(200).send({
    data: {
      checkins
    }
  })
}