import { ApolloError } from "apollo-server";
import { compare, genSalt, hash } from "bcryptjs";
import { MutationResolvers } from "../generated/graphql";
import { createAccessToken } from "../token";
import { TContext } from "./resolvers";

const Mutation: MutationResolvers<TContext> = {
  signUp: async (
    _,
    { username, email, password },
    { dataSources: { userAPI } }
  ) => {
    const user = await userAPI.getUser(email);

    if (user) throw new ApolloError("User Already Exists");

    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    await userAPI.createUser({ username, email, password: hashedPassword });

    return "Account registered successfully";
  },
  login: async (_, { email, password }, { dataSources: { userAPI } }) => {
    const user = await userAPI.getUser(email);
    if (!user) throw new ApolloError("Email doesn't exist");

    const valid = await compare(password, user.password);
    if (!valid) throw new ApolloError("Password Incorrect!");

    const accessToken = createAccessToken({ userId: user._id });

    return accessToken;
  },
  bookTrips: async (
    _,
    { launchIds },
    { dataSources: { userAPI, launchAPI } }
  ) => {
    const results = await userAPI.bookTrips(launchIds);
    const launches = await launchAPI.getLaunchesByIds(launchIds);

    return {
      success: results.length === launchIds.length,
      message:
        results.length === launchIds.length
          ? "Trips booked successfully"
          : `The following launches couldn't be booked: ${launchIds.filter(
              id => !results.includes(id)
            )}`,
      launches
    };
  },
  cancelTrip: async (
    _,
    { launchId },
    { dataSources: { userAPI, launchAPI } }
  ) => {
    const result = await userAPI.cancelTrip(launchId);

    if (!result) {
      return {
        success: false,
        message: "Failed to cancel trip"
      };
    }

    const launch = await launchAPI.getLaunchById(launchId);
    return {
      success: true,
      message: "Trip cancelled",
      launches: [launch]
    };
  }
};

export default Mutation;
