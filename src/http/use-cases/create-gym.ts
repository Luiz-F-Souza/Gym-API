import { prisma } from "@src/lib/prisma"

import { EmailAlreadyRegistered } from "./errors/register-errors"
import { Gym, User } from "@prisma/client"
import { GymsRepositoryInterface } from "@src/repositories/@interface/gyms-interface"


interface RequestInterface {
  title: string,
  description: string | null,
  phone: string,
  latitude: number,
  longitude: number
}

interface ReplyInterface {
  gym: Gym | null
}

export class CreateGymUseCase {

  constructor(private repository: GymsRepositoryInterface) { }

  async execute({ description, latitude, longitude, phone, title }: RequestInterface): Promise<ReplyInterface> {


    const gym = await this.repository.create({
      latitude,
      longitude,
      title,
      description,
      phone
    })

    return { gym }
  }
}
