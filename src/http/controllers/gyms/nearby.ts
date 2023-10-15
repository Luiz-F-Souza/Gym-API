import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { makeCreateGymsUseCase } from "@src/use-cases/factories/make-create-gyms-use-case"
import { makeSearchGymsUseCase } from "@src/use-cases/factories/make-search-gyms-use-case"
import { makeSearchNearGymsUseCase } from "@src/use-cases/factories/make-search-nearby-gyms-use-case"


export async function nearby(request: FastifyRequest, reply: FastifyReply) {

  const nearbyGymsQuerySchema = z.object({
    latitude: z.coerce.number().refine(latitude => {
      return Math.abs(latitude) <= 90 //Latitude precisa sempre ser menor ou igual a 90 (negativo ou positivo)
    }),
    longitude: z.coerce.number().refine(longitude => {
      return Math.abs(longitude) <= 180 //Longitude precisa sempre ser menor ou igual a 180 (negativo ou positivo)
    })
  })

  const { latitude, longitude } = nearbyGymsQuerySchema.parse(request.query)

  const { useCase } = makeSearchNearGymsUseCase()


  const { gyms } = await useCase.execute({
    userLatitude: latitude,
    userLongitude: longitude
  })


  return reply.status(200).send({
    data: {
      gyms: gyms
    }
  })
}