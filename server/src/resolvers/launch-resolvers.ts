import { EPatchSize, Launch, LaunchResolvers } from "../generated/graphql"
import { TContext } from "./resolvers"

const Launch: LaunchResolvers<TContext> = {
  isBooked: async (launch, _, { dataSources: { userAPI } }) => {
    return launch.isBooked ?? (await userAPI.isLaunchBooked(launch.id))
  },
  // rocket: async (launch, _, { dataSources: { launchAPI } }) => {
  //   return launchAPI.getLaunchById(launch.id)
  // },
  patch: async (launch: any, { size } = { size: EPatchSize.Small }, _) => {
    return size === EPatchSize.Small ? launch.patch.small : launch.patch.large
  }
}

export default Launch
