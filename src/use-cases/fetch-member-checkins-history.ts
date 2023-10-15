


import { CheckIn } from "@prisma/client";
import { CheckinRepositoryInterface } from "@src/repositories/@interface/checkin-interface";

interface RequestType {
  userId: string,
  page: number
}

interface ReplyType {
  checkins: CheckIn[],
}

export class FetchUserCheckinUseCase {

  constructor(private checkinRepository: CheckinRepositoryInterface) { }

  async execute({ userId, page }: RequestType): Promise<ReplyType> {

    const checkins = await this.checkinRepository.findManyByUserId(userId, page)

    if (!checkins) {
      throw new ResourseNotFound()
    }

    return {
      checkins,
    }
  }

}