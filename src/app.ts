import fastify from 'fastify'
import { appRoutes } from './http/routes'
import { ZodError } from 'zod'
import { env } from './env'


export const app = fastify()


app.register(appRoutes)

// Tratativa global, em caso de não termos tratado com return dentro de alguma camada 
app.setErrorHandler((err, _request, reply) => {

  if (err instanceof ZodError) {
    reply.status(400).send({ message: "Valor enviado incorreto", issues: err.format() })
  }

  if (env.NODE_ENV === "dev") console.log(err.message)

  return reply.status(500).send({
    message: "internal server error",
    errorName: err.name,
    details: err.message
  })
})