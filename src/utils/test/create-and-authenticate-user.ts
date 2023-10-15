import { FastifyInstance } from "fastify";
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await request(app.server)
    .post('/users')
    .send({
      name: 'Fulano de tals',
      email: 'fulanodetal@gmail.com',
      password: 'senha.123456'
    })

  const authResponse = await request(app.server)
    .post('/sessions')
    .send({
      email: 'fulanodetal@gmail.com',
      password: 'senha.123456'
    })

  const { jwt } = authResponse.body

  return { jwt }
}