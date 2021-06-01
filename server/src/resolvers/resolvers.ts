import LaunchAPI from "../data/launch"
import UserAPI from "../data/user"
import { Resolvers } from "../generated/graphql"
import Launch from "./launch-resolvers"
import Mutation from "./mutation-resolvers"
import Query from "./query-resolvers"
import User from "./user-resolvers"

export type TContext = {
  token: string
  dataSources: {
    launchAPI: LaunchAPI
    userAPI: UserAPI
  }
}

const resolvers: Resolvers<TContext> = {
  Query,
  Mutation,
  Launch,
  User
}

export default resolvers
