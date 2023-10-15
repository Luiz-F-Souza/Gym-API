import { describe, expect, it, beforeEach } from 'vitest'
import { compare } from 'bcryptjs'
import { EmailAlreadyRegistered } from './errors/register-errors'
import { InMemoryGymsRepository } from '@src/repositories/in-memory/gyms-repository'
import { CreateGymUseCase } from './create-gym'


let repository: InMemoryGymsRepository
let sut: CreateGymUseCase

const createGymData = {
  description: null,
  latitude: 0,
  longitude: 0,
  title: "Academia teste 01",
  phone: "22999999999"
}

describe('Create gym use case', () => {

  beforeEach(() => {
    repository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(repository)
  })

  it('should be able to create gym', async () => {
    const { gym } = await sut.execute(createGymData)

    expect(gym?.title).toBe(createGymData.title)
  })


})