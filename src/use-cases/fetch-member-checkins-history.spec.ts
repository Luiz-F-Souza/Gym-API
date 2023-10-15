

import { beforeEach, describe, expect, it, vi } from "vitest";

import { InMemoryCheckinRepository } from "@src/repositories/in-memory/checkin-repository";

import { FetchUserCheckinUseCase } from "./fetch-member-checkins-history";


let checkinRepository: InMemoryCheckinRepository
let sut: FetchUserCheckinUseCase

describe('Fetch user checkin history useCase', () => {

  beforeEach(() => {
    checkinRepository = new InMemoryCheckinRepository()
    sut = new FetchUserCheckinUseCase(checkinRepository)
  })


  it('should be able to fetch user checkins', async () => {

    await checkinRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01'
    })
    await checkinRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01'
    })

    const { checkins } = await sut.execute({ userId: 'user-01', page: 1 })

    expect(checkins).toHaveLength(2)

    expect(checkins).toEqual([
      expect.objectContaining({ gym_id: "gym-01" }),
      expect.objectContaining({ gym_id: "gym-02" })
    ])

  })


  it('should be able to fetch paginated user checkins history', async () => {

    for (let i = 1; i <= 25; i++) {
      await checkinRepository.create({
        gym_id: `gym-${i}`,
        user_id: 'user-01'
      })
    }

    const { checkins } = await sut.execute({ userId: 'user-01', page: 1 })

    expect(checkins).toHaveLength(20)

    expect(checkins)
      .toEqual(
        expect.arrayContaining(
          [
            expect.objectContaining({ gym_id: 'gym-1' }),
            expect.objectContaining({ gym_id: 'gym-20' })
          ]
        )
      )

    expect(checkins)
      .not
      .toEqual(
        expect.arrayContaining(
          [
            expect.objectContaining({ gym_id: 'gym-21' }),
            expect.objectContaining({ gym_id: 'gym-25' })
          ]
        )
      )

    const { checkins: checkinsPage2 } = await sut.execute({ userId: 'user-01', page: 2 })

    expect(checkinsPage2).toHaveLength(5)

    expect(checkinsPage2)
      .not
      .toEqual(
        expect.arrayContaining(
          [
            expect.objectContaining({ gym_id: 'gym-1' }),
            expect.objectContaining({ gym_id: 'gym-20' })
          ]
        )
      )

    expect(checkinsPage2)
      .toEqual(
        expect.arrayContaining(
          [
            expect.objectContaining({ gym_id: 'gym-21' }),
            expect.objectContaining({ gym_id: 'gym-25' })
          ]
        )
      )
  })



})