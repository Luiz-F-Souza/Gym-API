import { Gym } from "@prisma/client"
import { GymsRepositoryInterface } from "@src/repositories/@interface/gyms-interface"
import { normalizingStrings } from "../utils/normalizingStrings"


interface RequestInterface {
  query: string,
  page: number
}

interface ReplyInterface {
  gyms: Gym[] | null
}

export class SearchGymsUseCase {

  constructor(private repository: GymsRepositoryInterface) { }

  async execute({ query, page }: RequestInterface): Promise<ReplyInterface> {

    // const normalizedQuery = normalizingStrings(query)

    const gyms = await this.repository.searchMany(query, page)

    return { gyms }
  }
}
