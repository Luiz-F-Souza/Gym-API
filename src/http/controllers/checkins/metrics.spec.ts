import request from 'supertest'
import { app } from '@src/app';
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from '@src/utils/test/create-and-authenticate-user';
import { prisma } from '@src/lib/prisma';


describe('History Checkin e2e', () => {

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to retrieve checkins metrics', async () => {

    const { jwt } = await createAndAuthenticateUser(app)

    const user = await prisma.user.findFirst()

    const gym = await prisma.gym.create({
      data:{
        title: "Smartfit",
        description: "Gym description",
        phone: "2299999999",
        latitude: -21.7600785,
        longitude: -41.3319016
      }
    })

   await prisma.checkIn.createMany({
      data:[
        {
          gym_id: gym.id,
          user_id: user?.id ?? ''
        },
        {
          gym_id: gym.id,
          user_id: user?.id ?? ''
        }
      ]
    })

    const response = await request(app.server)
      .get(`/checkins/metrics`)
      .set('Authorization', `BEARER ${jwt}`)


    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      data:{
        checkinsQuantity: 2
      }
    })

  })
})