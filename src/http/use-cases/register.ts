import { prisma } from "@src/lib/prisma"
import { UserRepositoryInterfce } from "@src/repositories/@interface/users-interface"
import { PrismaUsersRepository } from "@src/repositories/prisma/users-repository"
import { hash } from "bcryptjs"
import { EmailAlreadyRegistered } from "./errors/register-errors"
import { User } from "@prisma/client"


interface RegisterUseCaseRequest {
  name: string,
  email: string,
  password: string
}

interface RegisterUseCaseReply {
  user: User | null
}

export class RegisterUseCase {

  constructor(private repository: UserRepositoryInterfce) { }

  async execute({ email, name, password }: RegisterUseCaseRequest): Promise<RegisterUseCaseReply> {

    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.repository.findUserByEmail(email)

    if (userWithSameEmail) throw new EmailAlreadyRegistered()

    const user = await this.repository.create({
      email,
      name,
      password_hash
    })

    return { user }
  }
}
