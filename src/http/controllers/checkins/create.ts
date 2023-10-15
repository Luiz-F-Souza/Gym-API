import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { makeCreateGymsUseCase } from "@src/use-cases/factories/make-create-gyms-use-case"
import { makeCheckinUseCase } from "@src/use-cases/factories/make-checkin-use-case"


export async function create(request: FastifyRequest, reply: FastifyReply) {

  const createChekcinParamsSchema = z.object({
    gymId: z.string().uuid()
  })

  const createCheckinBodySchema = z.object({

    latitude: z.number().refine(latitude => {
      return Math.abs(latitude) <= 90 //Latitude precisa sempre ser menor ou igual a 90 (negativo ou positivo)
    }),
    longitude: z.number().refine(longitude => {
      return Math.abs(longitude) <= 180 //Longitude precisa sempre ser menor ou igual a 180 (negativo ou positivo)
    })

  })

  const { gymId } = createChekcinParamsSchema.parse(request.params)
  const { latitude, longitude } = createCheckinBodySchema.parse(request.body)
  const { sub: userId } = request.user

  const { useCase } = makeCheckinUseCase()


  await useCase.execute({
    gymId,
    userLatitude: latitude,
    userLongitude: longitude,
    userId
  })


  return reply.status(201).send()
}