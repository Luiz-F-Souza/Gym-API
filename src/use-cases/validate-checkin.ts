import { CheckIn } from "@prisma/client";
import { CheckinRepositoryInterface } from "@src/repositories/@interface/checkin-interface";
import dayjs from "dayjs";


interface RequestType {
  checkinId: string
}

interface ReplyType {
  checkin: CheckIn
}

export class ValidateCheckInUseCase {

  constructor(private checkinRepository: CheckinRepositoryInterface) { }

  async execute({ checkinId }: RequestType): Promise<ReplyType> {

    const checkin = await this.checkinRepository.findById(checkinId)

    if (!checkin) throw new ResourseNotFound()

    const distanceInMinutesFromCheckinCreation = dayjs(new Date()).diff(checkin.created_at, 'minutes')

    if(distanceInMinutesFromCheckinCreation > 20) throw new Error()

    checkin.validated_at = new Date()

    const updatedCheckin = await this.checkinRepository.save(checkin)

    return {
      checkin: updatedCheckin
    }
  }

}