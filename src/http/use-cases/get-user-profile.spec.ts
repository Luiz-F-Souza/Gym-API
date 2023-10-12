
import { GetUserProfileUseCase } from "./get-user-profile";
import { InMemoryUsersRepository } from "@src/repositories/in-memory/users-repository";
import { expect, it, beforeEach, describe } from "vitest";
import { User } from "@prisma/client";
import { UserRepositoryInterfce } from "@src/repositories/@interface/users-interface";


let repository: UserRepositoryInterfce
let sut: GetUserProfileUseCase


describe("Get user profile", () => {

  beforeEach(() => {
    repository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(repository)
  })

  it('should return user profile by ID', async () => {

    const createdUser = await repository.create({
      email: 'dev@dev.com',
      name: 'dev tester',
      password_hash: "odfojodfoi"
    }) as User

    const returnedUser = await repository.findUserById(createdUser.id)

    expect(returnedUser?.id).toBe(createdUser.id)
  })
})