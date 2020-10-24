import { LaunchResolvers } from "../generated/graphql";
import { TContext } from "./resolvers";

const Launch: LaunchResolvers<TContext> = {
  isBooked: async (launch, _, { dataSources: { userAPI } }) =>
    await userAPI.isLaunchBooked(launch.id)!
};

export default Launch;
