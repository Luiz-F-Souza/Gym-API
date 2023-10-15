import { InMemoryGymsRepository } from "@src/repositories/in-memory/gyms-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { SearchGymsUseCase } from "./search-gyms";
import { Decimal } from "@prisma/client/runtime/library";


let repository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search gyms useCase', () => {

  beforeEach(() => {
    repository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(repository)
  })


  it('should be able to fetch gyms by query', async () => {

    await repository.create({
      latitude: new Decimal(0),
      longitude: new Decimal(0),
      title: 'My Super Gym',
    })

    await repository.create({
      latitude: new Decimal(0),
      longitude: new Decimal(0),
      title: 'Another super gym',
    })

    const { gyms } = await sut.execute({ query: 'my super', page: 1 })

    expect(gyms).toHaveLength(1)
    expect(gyms?.[0].title).toBe('My Super Gym')

    const { gyms: gymsQuery2 } = await sut.execute({ query: 'super', page: 1 })

    expect(gymsQuery2).toHaveLength(2)
    expect(gymsQuery2?.[0].title).toBe('My Super Gym')
    expect(gymsQuery2?.[1].title).toBe('Another super gym')

  })

  it('should be able to fetch pagineted gyms', async () => {

    for (let i = 1; i <= 25; i++) {
      await repository.create({
        latitude: new Decimal(0),
        longitude: new Decimal(0),
        title: `My super gym - ${i}`,
      })
    }



    const { gyms } = await sut.execute({ query: 'super', page: 1 })

    expect(gyms).toHaveLength(20)

    expect(gyms)
      .toEqual(
        expect.arrayContaining(
          [
            expect.objectContaining({ title: `My super gym - 1` }),
            expect.objectContaining({ title: `My super gym - 20` })
          ]
        )
      )

    expect(gyms)
      .not
      .toEqual(
        expect.arrayContaining(
          [
            expect.objectContaining({ title: `My super gym - 21` }),
            expect.objectContaining({ title: `My super gym - 25` })
          ]
        )
      )

    const { gyms: gymsPage2 } = await sut.execute({ query: ' super', page: 2 })

    expect(gymsPage2).toHaveLength(5)

    expect(gymsPage2)
      .toEqual(
        expect.arrayContaining(
          [
            expect.objectContaining({ title: `My super gym - 21` }),
            expect.objectContaining({ title: `My super gym - 25` })
          ]
        )
      )

    expect(gymsPage2)
      .not
      .toEqual(
        expect.arrayContaining(
          [
            expect.objectContaining({ title: `My super gym - 1` }),
            expect.objectContaining({ title: `My super gym - 20` })
          ]
        )
      )

  })


})