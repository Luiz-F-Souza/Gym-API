import { PrismaCheckinRepository } from "@src/repositories/prisma/checkin-repository"
import { ValidateCheckInUseCase } from "../validate-checkin"


export function makeValidateCheckinUseCase() {
  const repository = new PrismaCheckinRepository()
  const useCase = new ValidateCheckInUseCase(repository)

  return { useCase }
}