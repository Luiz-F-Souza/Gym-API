import { PrismaUsersRepository } from "@src/repositories/prisma/users-repository"
import { GetUserProfileUseCase } from "../get-user-profile"

export function makeGetUserProfileUseCase(){
  const repository = new PrismaUsersRepository()
  const useCase = new GetUserProfileUseCase(repository)

  return { useCase }
}