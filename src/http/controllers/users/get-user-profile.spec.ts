import request from 'supertest'
import { app } from '@src/app';
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from '@src/utils/test/create-and-authenticate-user';


describe('Profile e2e', () => {

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get logged user profile', async () => {

    const { jwt } = await createAndAuthenticateUser(app)

    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `BEARER ${jwt}`)

    expect(profileResponse.statusCode).toEqual(200)

    expect(profileResponse.body)
      .toEqual(
        {
          data: {
            user: expect.objectContaining(
              { email: "fulanodetal@gmail.com" }
            )
          }
        }
      )

  })
})