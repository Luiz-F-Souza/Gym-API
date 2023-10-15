import { describe, expect, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { InMemoryUsersRepository } from '@src/repositories/in-memory/users-repository'
import { compare } from 'bcryptjs'
import { EmailAlreadyRegistered } from './errors/register-errors'


let repository: InMemoryUsersRepository
let sut: RegisterUseCase

const createUserData = {
  email: 'dev@dev.com',
  name: "Dev teste",
  password: "13579"
}

describe('Register use case', () => {

  beforeEach(() => {
    repository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(repository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute(createUserData)
    expect(user?.email).toBe("dev@dev.com")
  })


  it('should hash user password', async () => {
    const { user } = await sut.execute(createUserData)

    const isPasswordCorretlyHashed = await compare(createUserData.password, user?.password_hash ?? '')

    expect(isPasswordCorretlyHashed).toBe(true)
  })

  it('should not be able to register with duplicated email', async () => {

    await sut.execute(createUserData)


    expect(async () => {
      await sut.execute({
        email: createUserData.email,
        name: "novo nome teste",
        password: "novoPassword"
      })
    }).rejects.toBeInstanceOf(EmailAlreadyRegistered)

  })
})