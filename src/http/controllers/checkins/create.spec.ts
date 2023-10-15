import request from 'supertest'
import { app } from '@src/app';
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from '@src/utils/test/create-and-authenticate-user';
import { prisma } from '@src/lib/prisma';


describe('Create Checkin e2e', () => {

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a checkin', async () => {

    const { jwt } = await createAndAuthenticateUser(app)

    const gym = await prisma.gym.create({
      data:{
        title: "Smartfit",
        description: "Gym description",
        phone: "2299999999",
        latitude: -21.7600785,
        longitude: -41.3319016
      }
    })

    const responseCheckin = await request(app.server)
      .post(`/gyms/${gym.id}/checkins`)
      .set('Authorization', `BEARER ${jwt}`)
      .send({
        latitude: -21.7600785,
        longitude: -41.3319016
      })


    expect(responseCheckin.statusCode).toEqual(201)

  })
})