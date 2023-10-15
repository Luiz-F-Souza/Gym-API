import { CheckIn } from "@prisma/client";
import { CheckinRepositoryInterface } from "@src/repositories/@interface/checkin-interface";



interface RequestType {
  userId: string
}

interface ReplyType {
  checkinsQuantity: number
}

export class GetUserMetricsUseCase {

  constructor(private checkinRepository: CheckinRepositoryInterface) { }

  async execute({ userId }: RequestType): Promise<ReplyType> {

    const checkinsQuantity = await this.checkinRepository.countByUserId(userId)

    if (!checkinsQuantity) {
      throw new ResourseNotFound()
    }

    return {
      checkinsQuantity,
    }
  }

}