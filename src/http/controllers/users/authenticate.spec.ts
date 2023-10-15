import request from 'supertest'
import { app } from '@src/app';
import { afterAll, beforeAll, describe, expect, it } from "vitest";


describe('Authenticate e2e', () => {

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server)
      .post('/users')
      .send({
        name: 'Fulano de tals',
        email: 'fulanodetal@gmail.com',
        password: 'senha.123456'
      })

    const response = await request(app.server)
      .post('/sessions')
      .send({
        email: 'fulanodetal@gmail.com',
        password: 'senha.123456'
      })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      jwt: expect.any(String)
    })

  })
})