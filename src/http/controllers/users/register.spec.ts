import request from 'supertest'
import { app } from '@src/app';
import { afterAll, beforeAll, describe, expect, it } from "vitest";


describe('Register e2e', () => {

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const response = await request(app.server)
      .post('/users')
      .send({
        name: 'Fulano de tals',
        email: 'fulanodetal@gmail.com',
        password: 'senha.123456'
      })

      expect(response.statusCode).toEqual(201)

  })
})