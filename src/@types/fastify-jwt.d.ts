import '@fastify/jwt'

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: {},
    user: {
      sub: string
    }
  }
}