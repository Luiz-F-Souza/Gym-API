import { FastifyReply, FastifyRequest } from "fastify"
import { makeUserMetricsUseCase } from "@src/use-cases/factories/make-get-user-metrics-use-case"


export async function metrics(request: FastifyRequest, reply: FastifyReply) {

  const { useCase } = makeUserMetricsUseCase()


  const { checkinsQuantity } = await useCase.execute({
    userId: request.user.sub,
  })


  return reply.status(200).send({
    data: {
      checkinsQuantity
    }
  })
}