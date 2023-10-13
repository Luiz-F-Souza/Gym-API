import { Decimal } from "@prisma/client/runtime/library";
import { GymsRepositoryInterface } from "../@interface/gyms-interface";
import { Gym, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";


export class InMemoryGymsRepository implements GymsRepositoryInterface {

  public fakeDataBase: Gym[] = []

  async findById(id: string): Promise<Gym | null> {

    const gym = this.fakeDataBase.find(gym => gym.id === id)

    if (!gym) return null

    return gym
  }

  async create(data: Prisma.GymCreateInput): Promise<Gym> {

    const gym: Gym = {
      id: randomUUID(),
      description: data.description ?? null,
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),
      phone: data.phone ?? null,
      title: data.title,

    }

    this.fakeDataBase.push(gym)

    return gym
  }
}