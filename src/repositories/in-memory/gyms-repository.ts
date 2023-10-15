import { Decimal } from "@prisma/client/runtime/library";
import { GymsRepositoryInterface } from "../@interface/gyms-interface";
import { Gym, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import { normalizingStrings } from "@src/utils/normalizingStrings";
import { getDistanceBetweenCoordinates } from "@src/utils/get-distance-between-coordinates";


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


  async searchMany(query: string, page: number): Promise<Gym[]> {

    const gyms = this.fakeDataBase.filter(gym => {

      // const normalizedTitle = normalizingStrings(gym.title)
      const doesTitleIncludesQuery = gym.title.toLowerCase().includes(query)
      if (doesTitleIncludesQuery) return true

      const normalizedDescription = normalizingStrings(gym.description ?? '')
      const doesDescriptionIncludesQuery = normalizedDescription.includes(query)

      if (doesDescriptionIncludesQuery) return true

      return false
    })

    const paginatedGyms = gyms.slice((page - 1) * 20, page * 20)

    return paginatedGyms
  }


  async findManyNear(userLtitude: number, userLongitude: number): Promise<Gym[]> {

    const gyms = this.fakeDataBase.filter(gym => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: Number(gym.latitude), longitude: Number(gym.longitude) },
        { latitude: userLtitude, longitude: userLongitude }
      )

      if (distance < 10) return true
      return false
    })

    return gyms
  }
}