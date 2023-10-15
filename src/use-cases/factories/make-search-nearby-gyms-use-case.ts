import { PrismaUsersRepository } from "@src/repositories/prisma/users-repository"
import { RegisterUseCase } from "../register"
import { PrismaGymsRepository } from "@src/repositories/prisma/gyms-repository"
import { SearchGymsUseCase } from "../search-gyms"
import { FetchNearGymsUseCase } from "../search-nearby-gyms"


export function makeSearchNearGymsUseCase(){
  const repository = new PrismaGymsRepository()
  const useCase = new FetchNearGymsUseCase(repository)

  return { useCase }
}