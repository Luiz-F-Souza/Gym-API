import { Prisma, User } from "@prisma/client";
import { UserRepositoryInterfce } from "../@interface/users-interface";
import { randomUUID } from "node:crypto";


export class InMemoryUsersRepository implements UserRepositoryInterfce {

  public fakeDataBase: User[] = []

  async create({ name, email, password_hash }: Prisma.UserCreateInput): Promise<User | null> {

    const user: User = {
      created_at: new Date(),
      email,
      id: randomUUID(),
      name,
      password_hash
    }

    this.fakeDataBase.push(user)

    return user
  }

  async findUserByEmail(email: string): Promise<User | null> {

    const user = this.fakeDataBase.find(user => user.email === email) ?? null

    return user
  }

  async findUserById(userId: string): Promise< User | null>{

    const user = this.fakeDataBase.find(user => user.id === userId) ?? null

    return user
  }
}