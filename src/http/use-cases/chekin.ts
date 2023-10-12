import { UserRepositoryInterfce } from "@src/repositories/@interface/users-interface";
import { CheckIn, User } from "@prisma/client";
import { CheckinRepositoryInterface } from "@src/repositories/@interface/checkin-interface";


interface RequestType {
  userId: string,
  gymId: string,
}

interface ReplyType {
  checkin: CheckIn
} 

export class ChekInUseCase {

  constructor(private repository: CheckinRepositoryInterface) { }

  async execute({ userId, gymId }: RequestType): Promise<ReplyType> {

    const checkin = await this.repository.create({gym_id: gymId, user_id: userId})

    if (!checkin) {
      throw new ResourseNotFound()
    }

    return {
      checkin
    }
  }

}