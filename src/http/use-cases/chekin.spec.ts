import { beforeEach, describe, expect, it } from "vitest";
import { ChekInUseCase } from "./chekin";
import { InMemoryCheckinRepository } from "@src/repositories/in-memory/checkin-repository";
import { CheckinRepositoryInterface } from "@src/repositories/@interface/checkin-interface";


let repository: CheckinRepositoryInterface
let sut: ChekInUseCase

describe('Checkin useCase', () => {

  beforeEach(() => {
    repository = new InMemoryCheckinRepository()
    sut = new ChekInUseCase(repository)
  })

  it('should return a created checkin',async () => {
    const {checkin} = await sut.execute({ gymId: "sdijdf", userId: "jsdfoj" })

    expect(checkin.id).toEqual(expect.any(String))
  })
})