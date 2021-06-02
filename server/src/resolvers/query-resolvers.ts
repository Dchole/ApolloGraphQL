import { Launch, QueryResolvers } from "../generated/graphql"
import { paginateResults } from "../utils"
import { TContext } from "./resolvers"

const Query: QueryResolvers<TContext> = {
  me: async (_, __, { dataSources: { userAPI } }) => {
    return (await userAPI.getLoggedInUser()) as any
  },
  launches: async (
    _,
    { limit, page, isBooked },
    { dataSources: { userAPI, launchAPI } }
  ) => {
    const bookedLaunchesIdsPromise = userAPI.getLaunchIdsByUser()
    const launchesPromise: Promise<Launch[]> = launchAPI.getAllLaunches(
      limit,
      page
    )

    const [allLaunches, bookedLaunchesIds] = await Promise.all([
      launchesPromise,
      bookedLaunchesIdsPromise
    ])

    const bookedLaunches = await launchAPI.getLaunchesByIds(bookedLaunchesIds)

    const hasMore = await launchAPI.hasMore(
      allLaunches.map(launch => launch.id)
    )

    return {
      launches: isBooked ? bookedLaunches : allLaunches,
      hasMore
    }
  },
  launch: (_parent, { id }, { dataSources: { launchAPI } }) =>
    launchAPI.getLaunchById(id)
}

export default Query
