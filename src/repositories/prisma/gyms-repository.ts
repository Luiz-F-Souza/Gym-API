import { Gym, Prisma } from "@prisma/client";

import { GymsRepositoryInterface } from "../@interface/gyms-interface";
import { prisma } from "@src/lib/prisma";

export class PrismaGymsRepository implements GymsRepositoryInterface {

  async create(data: Prisma.GymCreateInput): Promise<Gym> {

    const gym = await prisma.gym.create({
      data
    })

    return gym
  }

  async findById(id: string): Promise<Gym | null> {
    const gym = await prisma.gym.findUnique({
      where: {
        id: id
      }
    })

    return gym
  }

  async searchMany(query: string, page: number): Promise<Gym[]> {
    const gyms = await prisma.gym.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query,
              mode: 'insensitive',
            }
          },
          {
            description: {
              contains: query,
              mode: 'insensitive',
            }
          },
        ]

      },
      take: 20,
      skip: (page - 1) * 20
    })

    return gyms
  }

  async findManyNear(latitude: number, longitude: number): Promise<Gym[]> {

    const gyms = await prisma.$queryRaw<Gym[]>`
      SELECT * from gyms
      WHERE ( 
        6371 
        * acos( cos( radians(${latitude}) )
        * cos( radians( latitude ) ) 
        * cos( radians( longitude ) 
        - radians(${longitude}) ) 
        + sin( radians(${latitude}) ) 
        * sin( radians( latitude ) ) ) ) 
        <= 10
    `

    return gyms
  }

}