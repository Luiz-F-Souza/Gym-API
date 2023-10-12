import { User } from "@prisma/client";

type Props = {
  name: string, 
  email: string, 
  password_hash: string
}
export interface UserRepositoryInterfce {

  create: ({ name, email, password_hash }: Props) => Promise<User | null>

  findUserByEmail: (email: string) => Promise<User | null>

  findUserById: (userId: string) => Promise<User | null>
}