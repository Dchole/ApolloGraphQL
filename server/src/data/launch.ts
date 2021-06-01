import { RESTDataSource } from "apollo-datasource-rest"
import type { Rocket } from "../generated/graphql"

class LaunchAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = "https://api.spacexdata.com/v4"
  }

  launchReducer(launch: { [key: string]: any }): any {
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

  async hasMore(launches: string[]) {
    const { docs }: { docs: { id: string }[] } = await this.post(
      "launches/query",
      {
        query: { _id: { $in: launches } },
        options: {
          select: "name",
          pagination: false
        }
      }
    )

    const cursor = launches[launches.length - 1]

    const indexOfCursor = docs.findIndex(
      launch => launch.id.toString() === cursor.toString()
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
    const { docs } = await this.post("launches/query", {
      query: { _id: launchId },
      options: {
        select: "name details links patch",
        populate: {
          path: "rocket",
          select: {
            name: 1,
            type: 1
          }
        }
      }
    })

    return this.launchReducer(docs[0])
  }

  getLaunchesByIds(launchIds: string[]) {
    return Promise.all(launchIds.map(launchId => this.getLaunchById(launchId)))
  }
}

export default LaunchAPI
