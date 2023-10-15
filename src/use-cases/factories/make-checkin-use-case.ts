import { CheckInUseCase } from "../checkin"
import { PrismaGymsRepository } from "@src/repositories/prisma/gyms-repository"
import { PrismaCheckinRepository } from "@src/repositories/prisma/checkin-repository"

export function makeCheckinUseCase() {
  const checkinRepository = new PrismaCheckinRepository()
  const gymRepository = new PrismaGymsRepository()
  const useCase = new CheckInUseCase(checkinRepository, gymRepository)

  return { useCase }
}