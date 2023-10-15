import { PrismaCheckinRepository } from "@src/repositories/prisma/checkin-repository"
import { FetchUserCheckinUseCase } from "../fetch-member-checkins-history"


export function makeFetchMemberCheckinsHistoryUseCase() {
  const checkinRepository = new PrismaCheckinRepository()
  const useCase = new FetchUserCheckinUseCase(checkinRepository)

  return { useCase }

}