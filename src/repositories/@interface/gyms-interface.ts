import { Gym, Prisma } from "@prisma/client";


export interface GymsRepositoryInterface {

  create(data: Prisma.GymCreateInput): Promise<Gym>
  findById(id: string): Promise<Gym | null>
}