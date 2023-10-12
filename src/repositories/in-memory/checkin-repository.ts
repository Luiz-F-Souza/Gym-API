import { CheckIn, Prisma } from "@prisma/client";
import { CheckinRepositoryInterface } from "../@interface/checkin-interface";
import { randomUUID } from "crypto";


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
}