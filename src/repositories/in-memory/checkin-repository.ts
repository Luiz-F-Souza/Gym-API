import { CheckIn, Prisma } from "@prisma/client";
import { CheckinRepositoryInterface } from "../@interface/checkin-interface";
import { randomUUID } from "crypto";
import dayjs from "dayjs";


export class InMemoryCheckinRepository implements CheckinRepositoryInterface {

  public fakeDataBase: CheckIn[] = []

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn | null> {

    const checkin = {
      created_at: new Date(),
      gym_id: data.gym_id,
      user_id: data.user_id,
      validated_at: data.validated_at ? new Date() : null,
      id: randomUUID()
    }

    this.fakeDataBase.push(checkin)

    return checkin
  }

  async findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null> {

    const checkinOnSameDate = this.fakeDataBase.find(checkin => {

      const isSameId = checkin.user_id === userId
      if (!isSameId) return false

      const isSameDate = dayjs(date).isSame(checkin.created_at, 'day')
      if (!isSameDate) return false
      else return true

    })

    if (!checkinOnSameDate) return null

    return checkinOnSameDate
  }

  async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
    const checkins = this.fakeDataBase.filter(checkin => checkin.user_id === userId)

    const checkinsInSpecificPage = checkins.slice((page - 1) * 20, page * 20)

    return checkinsInSpecificPage
  }

  async countByUserId(userId: string): Promise<number> {
    const checkins = this.fakeDataBase.filter(checkin => checkin.user_id === userId)

    const checkinsQuantity = checkins.length
    return checkinsQuantity
  }

  async findById(checkinId: string): Promise<CheckIn | null> {

    const checkin = this.fakeDataBase.find(checkin => checkin.id === checkinId)

    if (!checkin) return null

    return checkin
  }

  async save(checkin: CheckIn): Promise<CheckIn> {
    const checkinIndex = this.fakeDataBase.findIndex(dbCheckin => dbCheckin.id === checkin.id)

    if (checkinIndex > -1) this.fakeDataBase[checkinIndex] = checkin

    return checkin
  }

}