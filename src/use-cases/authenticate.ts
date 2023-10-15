import { UserRepositoryInterfce } from "@src/repositories/@interface/users-interface";
import { InvalidCretendialsError } from "./errors/invalid-credentials-error";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";


interface RequestType {
  email: string,
  password: string
}

interface ReplyType {
  user: User
}

export class AuthenticateUseCase {

  constructor(private repository: UserRepositoryInterfce) { }

  async execute({ email, password }: RequestType): Promise<ReplyType> {

    const user = await this.repository.findUserByEmail(email)

    if (!user) {
      throw new InvalidCretendialsError()
    }


    const doesPasswordMatches = await compare(password, user.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCretendialsError()
    }

    return {
      user
    }
  }

}