import { PrismaGymsRepository } from "@src/repositories/prisma/gyms-repository"
import { SearchGymsUseCase } from "../search-gyms"


export function makeSearchGymsUseCase() {
  const repository = new PrismaGymsRepository()
  const useCase = new SearchGymsUseCase(repository)

  return { useCase }
}