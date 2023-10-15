import { InMemoryCheckinRepository } from "@src/repositories/in-memory/checkin-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { GetUserMetricsUseCase } from "./get-user-metrics";


let repository: InMemoryCheckinRepository
let sut: GetUserMetricsUseCase

describe('Get user Metrics use case', () => {

  beforeEach(() => {
    repository = new InMemoryCheckinRepository()
    sut = new GetUserMetricsUseCase(repository)
  })

  it('should be able to retrieve correct number of checkins by id', async () => {

    for (let i = 0; i < 10; i++) {
      await repository.create({
        gym_id: 'gym-01',
        user_id: 'user-01'
      })
    }

    const { checkinsQuantity } = await sut.execute({ userId: 'user-01' })
    expect(checkinsQuantity).toBe(10)
  })
})