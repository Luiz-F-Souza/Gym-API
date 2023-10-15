import { CheckIn, Prisma } from "@prisma/client";
import { CheckinRepositoryInterface } from "../@interface/checkin-interface";
import { prisma } from "@src/lib/prisma";
import dayjs from "dayjs";


export class PrismaCheckinRepository implements CheckinRepositoryInterface {

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn | null> {
    const checkin = await prisma.checkIn.create({ data })

    return checkin
  }

  async findById(checkinId: string): Promise<CheckIn | null> {

    const checkin = await prisma.checkIn.findUnique({
      where: {
        id: checkinId
      }
    })

    return checkin
  }

  async findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null> {

    const today = dayjs(new Date())
    const startOfDay = today.startOf('date').toDate()
    const endOfDay = today.endOf('date').toDate()

    const checkin = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfDay,
          lte: endOfDay
        }
      }
    })

    return checkin
  }

  async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {

    const checkins = await prisma.checkIn.findMany({
      where: {
        user_id: userId
      },
      take: 20,
      skip: (page - 1) * 20
    })

    return checkins
  }

  async countByUserId(userId: string): Promise<number> {
    const count = await prisma.checkIn.count({
      where: {
        user_id: userId
      }
    })
    return count
  }


  async save(checkin: CheckIn): Promise<CheckIn> {
    return await prisma.checkIn.update({
      where: {
        id: checkin.id
      },
      data: checkin
    })
  }

}