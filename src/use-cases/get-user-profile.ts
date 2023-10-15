import { UserRepositoryInterfce } from "@src/repositories/@interface/users-interface";
import { User } from "@prisma/client";


interface RequestType {
  userId: string,
}

interface ReplyType {
  user: User
}

export class GetUserProfileUseCase {

  constructor(private repository: UserRepositoryInterfce) { }

  async execute({ userId }: RequestType): Promise<ReplyType> {

    const user = await this.repository.findUserById(userId)

    if (!user) {
      throw new ResourseNotFound()
    }

    return {
      user
    }
  }

}