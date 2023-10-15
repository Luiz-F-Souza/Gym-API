import request from 'supertest'
import { app } from '@src/app';
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from '@src/utils/test/create-and-authenticate-user';
import { prisma } from '@src/lib/prisma';


describe('Validate Checkin e2e', () => {

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to validate a checkin', async () => {


    const { jwt } = await createAndAuthenticateUser(app)

    const user = await prisma.user.findFirst()

    const gym = await prisma.gym.create({
      data: {
        title: "Smartfit",
        description: "Gym description",
        phone: "2299999999",
        latitude: -21.7600785,
        longitude: -41.3319016
      }
    })

    const checkin = await prisma.checkIn.create({
      data: {
        gym_id: gym.id,
        user_id: user?.id ?? ''
      }
    })

    const responseCheckin = await request(app.server)
      .patch(`/checkins/${checkin.id}/validate`)
      .set('Authorization', `BEARER ${jwt}`)
      .send()


    expect(responseCheckin.statusCode).toEqual(204)

    const updatedCheckin = await prisma.checkIn.findUniqueOrThrow({
      where:{
        id: checkin.id
      }
    })

    expect(updatedCheckin.validated_at).toEqual(expect.any(Date))
  })
})