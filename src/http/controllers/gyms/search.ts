import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { makeSearchGymsUseCase } from "@src/use-cases/factories/make-search-gyms-use-case"


export async function search(request: FastifyRequest, reply: FastifyReply) {

  const searchGymQuerySchema = z.object({
   query: z.string(),
   page: z.coerce.number().min(1).default(1)
  })

  const { page, query} = searchGymQuerySchema.parse(request.query)

  const { useCase } = makeSearchGymsUseCase()


  const {gyms} = await useCase.execute({
    page,
    query
  })


  return reply.status(200).send({
    data:{
      gyms: gyms
    }
  })
}