import { CheckIn, User } from "@prisma/client";
import { CheckinRepositoryInterface } from "@src/repositories/@interface/checkin-interface";
import { GymsRepositoryInterface } from "@src/repositories/@interface/gyms-interface";
import { getDistanceBetweenCoordinates } from "../utils/get-distance-between-coordinates";
import { MaxDistanceError } from "./errors/max-distance-error";
import { MaxCheckinsError } from "./errors/max-number-of-chekins-error";


interface RequestType {
  userId: string,
  gymId: string,
  userLatitude: number,
  userLongitude: number
}

interface ReplyType {
  checkin: CheckIn
}

export class CheckInUseCase {

  constructor(
    private checkinRepository: CheckinRepositoryInterface,
    private gymsRepository: GymsRepositoryInterface
  ) { }

  async execute({ userId, gymId, userLatitude, userLongitude }: RequestType): Promise<ReplyType> {

    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) throw new ResourseNotFound()

    const gymLatitude = Number(gym.latitude)
    const gymLongitude = Number(gym.longitude)

    const distanceBetweenUserAndGym = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      { latitude: gymLatitude, longitude: gymLongitude }
    )

    const MAX_DISTANCE_IN_KM = 0.1
    if (distanceBetweenUserAndGym > MAX_DISTANCE_IN_KM) throw new MaxDistanceError()

    const doesUserAlreadyCheckinToday = await this.checkinRepository.findByUserIdOnDate(userId, new Date())

    if (doesUserAlreadyCheckinToday) throw new MaxCheckinsError()

    const checkin = await this.checkinRepository.create({ gym_id: gymId, user_id: userId })

    if (!checkin) {
      throw new ResourseNotFound()
    }

    return {
      checkin
    }
  }

}