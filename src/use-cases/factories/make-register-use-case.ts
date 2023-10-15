import { PrismaUsersRepository } from "@src/repositories/prisma/users-repository"
import { RegisterUseCase } from "../register"


export function makeRegisterUseCase(){
  const repository = new PrismaUsersRepository()
  const useCase = new RegisterUseCase(repository)

  return { useCase }
}