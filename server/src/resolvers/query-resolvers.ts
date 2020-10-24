import { ApolloError } from "apollo-server";
import { QueryResolvers } from "../generated/graphql";
import { paginateResults } from "../utils";
import { TContext } from "./resolvers";

const Query: QueryResolvers<TContext> = {
  me: async (_, __, { dataSources: { userAPI } }) => {
    return (await userAPI.getLoggedInUser()) as any;
  },
  launches: async (
    _,
    { pageSize = 20, after },
    { dataSources: { launchAPI } }
  ) => {
    const allLaunches = await launchAPI.getAllLaunches();
    allLaunches.reverse();

    const launches = paginateResults(
      Number(pageSize),
      allLaunches,
      after || undefined
    );

    return {
      launches,
      cursor: launches.length ? Number(launches[launches.length - 1].id) : null,
      hasMore: launches.length
        ? launches[launches.length - 1].id !==
          allLaunches[allLaunches.length - 1].id
        : false
    };
  },
  launch: (_parent, { id }, { dataSources: { launchAPI } }) =>
    launchAPI.getLaunchById(id)
};

export default Query;
