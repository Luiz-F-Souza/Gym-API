import request from 'supertest'
import { app } from '@src/app';
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from '@src/utils/test/create-and-authenticate-user';


describe('Create Gym e2e', () => {

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a gym', async () => {

    const { jwt } = await createAndAuthenticateUser(app)

    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `BEARER ${jwt}`)
      .send({
        title: "Smartfit",
        description: "Gym description",
        phone: "2299999999",
        latitude: -21.7600785,
        longitude: -41.3319016
      })

    expect(response.statusCode).toEqual(201)

  })
})