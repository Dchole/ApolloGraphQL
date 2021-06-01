import { RESTDataSource } from "apollo-datasource-rest"
import type { Rocket } from "../generated/graphql"

class LaunchAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = "https://api.spacexdata.com/v4"
  }

  launchReducer(launch: { [key: string]: any }): any {
    console.log(launch.static_fire_date_unix)

    return {
      id: launch.id,
      name: launch.name,
      details: launch.details,
      links: {
        article: launch.links.article,
        video: launch.links.webcast
      },
      patch: {
        small: launch.links.patch.small,
        large: launch.links.patch.large
      },
      rocket: {
        id: launch.rocket.id,
        name: launch.rocket.name,
        type: launch.rocket.type
      }
    }
  }

  rocketReducer(rocket: Record<string, any>): Rocket {
    return {
      id: rocket.id,
      name: rocket.name,
      type: rocket.type
    }
  }

  async hasMore(launches: string[]) {
    interface IDoc {
      id: string
      name: string
    }

    const { docs }: { docs: IDoc[] } = await this.post("launches/query", {
      query: { name: { $in: launches } },
      options: {
        select: "name",
        pagination: false
      }
    })

    const cursor = launches[launches.length - 1]

    const indexOfCursor = docs.findIndex(
      launch => launch.name.toString() === cursor.toString()
    )

    return indexOfCursor + 1 < docs.length
  }

  async getAllLaunches(limit?: null | number, page?: null | number) {
    const pageLimit = limit ?? 10,
      currentPage = page ?? 1

    const { docs } = await this.post("launches/query", {
      query: {},
      options: {
        select: "name details links patch",
        limit,
        offset: (currentPage - 1) * pageLimit,
        populate: {
          path: "rocket",
          select: {
            name: 1,
            type: 1
          }
        }
      }
    })

    return Array.isArray(docs)
      ? docs.map(launch => this.launchReducer(launch))
      : []
  }

  async getLaunchById(launchId: string) {
    const [launch] = await this.get("launches", { id: launchId })
    return this.launchReducer(launch)
  }

  async getRockets() {
    const response = await this.get("rockets")
    return Array.isArray(response)
      ? response.map(rocket => this.rocketReducer(rocket))
      : []
  }

  async getRocketById(rocketId: string) {
    const [rocket] = await this.get("rockets", { id: rocketId })
    return this.rocketReducer(rocket)
  }

  getLaunchesByIds(launchIds: string[]) {
    return Promise.all(launchIds.map(launchId => this.getLaunchById(launchId)))
  }
}

export default LaunchAPI
