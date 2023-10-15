import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { makeCreateGymsUseCase } from "@src/use-cases/factories/make-create-gyms-use-case"


export async function create(request: FastifyRequest, reply: FastifyReply) {

  const createGymBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().min(6).nullable(),
    latitude: z.number().refine(latitude => {
      return Math.abs(latitude) <= 90 //Latitude precisa sempre ser menor ou igual a 90 (negativo ou positivo)
    }),
    longitude: z.number().refine(longitude => {
      return Math.abs(longitude) <= 180 //Longitude precisa sempre ser menor ou igual a 180 (negativo ou positivo)
    })

  })

  const { title, description, latitude, longitude, phone } = createGymBodySchema.parse(request.body)

  const { useCase } = makeCreateGymsUseCase()


  await useCase.execute({
    title,
    description,
    latitude,
    longitude,
    phone
  })


  return reply.status(201).send()
}