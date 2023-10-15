import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CheckInUseCase } from "./checkin";
import { InMemoryCheckinRepository } from "@src/repositories/in-memory/checkin-repository";
import { InMemoryGymsRepository } from "@src/repositories/in-memory/gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { MaxCheckinsError } from "./errors/max-number-of-chekins-error";
import { MaxDistanceError } from "./errors/max-distance-error";


let checkinRepository: InMemoryCheckinRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Checkin useCase', () => {

  beforeEach(() => {
    checkinRepository = new InMemoryCheckinRepository()
    gymsRepository = new InMemoryGymsRepository()

    gymsRepository.fakeDataBase.push({
      id: "gym-01",
      title: "SmartFit - Campos",
      description: "",
      latitude: new Decimal(-21.7771066),
      longitude: new Decimal(-41.3969643),
      phone: ""
    })
    sut = new CheckInUseCase(checkinRepository, gymsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to create a checkin', async () => {

    const { checkin } = await sut.execute({
      gymId: "gym-01",
      userId: "jsdfoj",
      userLatitude: -21.7771066,
      userLongitude: -41.3969643
    })

    expect(checkin.id).toEqual(expect.any(String))
  })

  it('should not be able to checkin twice in a day', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 12, 0, 0))

    await sut.execute({
      gymId: "gym-01",
      userId: "jsdfoj",
      userLatitude: -21.7771066,
      userLongitude: -41.3969643
    })

    vi.setSystemTime(new Date(2023, 0, 1, 17, 0, 0))
    expect(async () => {
      await sut.execute({
        gymId: "gym-01",
        userId: "jsdfoj",
        userLatitude: -21.7771066,
        userLongitude: -41.3969643
      })
    }).rejects.toBeInstanceOf(MaxCheckinsError)
  })

  it('should be able to checkin twice in different days', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 12, 0, 0))

    await sut.execute({
      gymId: "gym-01",
      userId: "jsdfoj",
      userLatitude: -21.7771066,
      userLongitude: -41.3969643
    })

    vi.setSystemTime(new Date(2023, 0, 2, 12, 0, 0))

    const { checkin } = await sut.execute({
      gymId: "gym-01",
      userId: "jsdfoj",
      userLatitude: -21.7771066,
      userLongitude: -41.3969643
    })

    expect(checkin.id).toEqual(expect.any(String))

  })


  it('should not be able to create a checkin on distant gym', async () => {

    expect(async () => {
      await sut.execute({
        gymId: "gym-01",
        userId: "jsdfoj",
        userLatitude: -21.8597462,
        userLongitude: -42.1732726,
      })
    }).rejects.toBeInstanceOf(MaxDistanceError)

  })


})