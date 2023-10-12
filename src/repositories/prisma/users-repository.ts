import { prisma } from "@src/lib/prisma";
import { Prisma, User } from '@prisma/client'
import { UserRepositoryInterfce } from "../@interface/users-interface";


export class PrismaUsersRepository implements UserRepositoryInterfce {

  async create(data: Prisma.UserCreateInput) {
    const { email, name, password_hash } = data

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password_hash
      }
    })

    return user
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    return user
  }

  async findUserById(userId: string): Promise<User | null>{
    const user = await prisma.user.findUnique({
      where:{
        id: userId
      }
    })

    return user
  }

}