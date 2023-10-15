
import { GetUserMetricsUseCase } from "../get-user-metrics"
import { PrismaCheckinRepository } from "@src/repositories/prisma/checkin-repository"

export function makeUserMetricsUseCase(){
  const repository = new PrismaCheckinRepository()
  const useCase = new GetUserMetricsUseCase(repository)

  return { useCase }
}