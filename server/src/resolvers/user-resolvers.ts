import { UserResolvers } from "../generated/graphql";
import { TContext } from "./resolvers";

const User: UserResolvers<TContext> = {
  trips: async (_, __, { dataSources: { userAPI, launchAPI } }) => {
    const launchIds = await userAPI.getLaunchIdsByUser();

    if (!launchIds) return [];

    return launchAPI.getLaunchesByIds(launchIds) || [];
  }
};

export default User;
