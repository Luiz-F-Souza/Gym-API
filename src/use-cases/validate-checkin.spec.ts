import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { InMemoryCheckinRepository } from "@src/repositories/in-memory/checkin-repository";
import { ValidateCheckInUseCase } from "./validate-checkin";



let checkinRepository: InMemoryCheckinRepository

let sut: ValidateCheckInUseCase

describe('Checkin useCase', () => {

  beforeEach(() => {
    checkinRepository = new InMemoryCheckinRepository()

    sut = new ValidateCheckInUseCase(checkinRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validate a checkin', async () => {

    const checkin = await checkinRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    })

    const { checkin: validatedCheckin } = await sut.execute({ checkinId: checkin?.id ?? "" })

   
    expect(validatedCheckin.validated_at).toEqual(expect.any(Date))
    expect(checkinRepository.fakeDataBase[0].validated_at).toEqual(expect.any(Date))
  })

  it('should not be able to validate a checkin after 20minutes of its creation', async () => {

    vi.setSystemTime(new Date(2023, 0, 1, 12, 0))

    const checkin = await checkinRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    })

    const tweentyOneMinutes = 1000 * 60 * 21 // 1000 ms 

    vi.advanceTimersByTime(tweentyOneMinutes)

    expect(async () => {
      await sut.execute({ checkinId: checkin?.id ?? "" })
    }).rejects.toBeInstanceOf(Error)
  })


})