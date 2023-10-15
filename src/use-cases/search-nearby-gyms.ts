import { Gym } from "@prisma/client"
import { GymsRepositoryInterface } from "@src/repositories/@interface/gyms-interface"
import { normalizingStrings } from "../utils/normalizingStrings"


interface RequestInterface {
  userLatitude: number,
  userLongitude: number
}

interface ReplyInterface {
  gyms: Gym[] | null
}

export class FetchNearGymsUseCase {

  constructor(private repository: GymsRepositoryInterface) { }

  async execute({ userLatitude, userLongitude }: RequestInterface): Promise<ReplyInterface> {


    const gyms = await this.repository.findManyNear(userLatitude, userLongitude)

    return { gyms }
  }
}
