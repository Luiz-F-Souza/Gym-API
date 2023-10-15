import request from 'supertest'
import { app } from '@src/app';
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from '@src/utils/test/create-and-authenticate-user';


describe('Search Gyms e2e', () => {

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search gyms by query', async () => {

    const { jwt } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `BEARER ${jwt}`)
      .send({
        title: "Smartfit",
        description: "Gym description",
        phone: "2299999999",
        latitude: -21.7600785,
        longitude: -41.3319016
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `BEARER ${jwt}`)
      .send({
        title: "Another Gym",
        description: "Gym description",
        phone: "2299999999",
        latitude: -21.7600785,
        longitude: -41.3319016
      })

    const response = await request(app.server)
      .get('/gyms/search')
      .query({
        query: 'Smartfit',
        page: 1
      })
      .set('Authorization', `BEARER ${jwt}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      data: {
        gyms: [
          expect.objectContaining({ title: 'Smartfit' })
        ]
      }
    })

  })
})