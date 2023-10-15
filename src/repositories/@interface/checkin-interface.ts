import { CheckIn, Prisma } from "@prisma/client";


export interface CheckinRepositoryInterface {

  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn | null>

  findById(checkinId: string): Promise<CheckIn | null>

  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>

  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>

  countByUserId(userId: string): Promise<number>

  save(checkin: CheckIn): Promise<CheckIn>
}