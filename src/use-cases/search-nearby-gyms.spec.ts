import { InMemoryGymsRepository } from "@src/repositories/in-memory/gyms-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { Decimal } from "@prisma/client/runtime/library";
import { FetchNearGymsUseCase } from "./search-nearby-gyms";


let repository: InMemoryGymsRepository
let sut: FetchNearGymsUseCase

describe('Search gyms useCase', () => {

  beforeEach(() => {
    repository = new InMemoryGymsRepository()
    sut = new FetchNearGymsUseCase(repository)
  })


  it('should be able to fetch near gyms', async () => {

    await repository.create({
      latitude: new Decimal(-21.7618021),
      longitude: new Decimal(-41.3252416),
      title: 'My Super Gym',
    })

    const { gyms } = await sut.execute({ userLatitude: -21.7547614, userLongitude: -41.3279036 })

    expect(gyms).toHaveLength(1)
    expect(gyms?.[0].title).toBe('My Super Gym')

  })

  it('should not show far gyms', async () => {

    await repository.create({
      latitude: new Decimal(-21.7618021),
      longitude: new Decimal(-41.3252416),
      title: 'My Super Gym',
    })

    const { gyms } = await sut.execute({ userLatitude: -21.7613559, userLongitude: -41.5342072 })

    expect(gyms).toHaveLength(0)
    
  })

})