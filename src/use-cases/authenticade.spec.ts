import { describe, expect, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@src/repositories/in-memory/users-repository'
import { hash } from 'bcryptjs'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCretendialsError } from './errors/invalid-credentials-error'


let repository: InMemoryUsersRepository
let sut: AuthenticateUseCase

const fakeData = {
  email: 'tester@dev.com',
  name: 'Dev Tester',
  password: '123456'
}


describe('Authenticate use case', async () => {


  beforeEach(() => {
    repository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(repository)
  })

  it('should be able to authenticate', async () => {

    await repository.create({
      email: fakeData.email,
      name: fakeData.name,
      password_hash: await hash(fakeData.password, 6)
    })

    const { user } = await sut.execute({ email: fakeData.email, password: fakeData.password })

    expect(user?.email).toBe(fakeData.email)
  })

  it('should not be able to authenticate with wrong email', async () => {

    expect(async () => {
      await sut.execute({ email: fakeData.email, password: fakeData.password })
    }).rejects.toBeInstanceOf(InvalidCretendialsError)

  })

  it('should not be able to authenticate with worng password', async () => {

    await repository.create({
      email: fakeData.email,
      name: fakeData.name,
      password_hash: await hash(fakeData.password, 6)
    })

    expect(async () => {
      await sut.execute({ email: fakeData.email, password: "wrong password" })
    }).rejects.toBeInstanceOf(InvalidCretendialsError)
    
  })

})