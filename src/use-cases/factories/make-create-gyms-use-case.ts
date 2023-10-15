import { PrismaGymsRepository } from "@src/repositories/prisma/gyms-repository";
import { CreateGymUseCase } from "../create-gym";

export function makeCreateGymsUseCase() {
  const repository = new PrismaGymsRepository()
  const useCase = new CreateGymUseCase(repository)

  return { useCase }
}