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
  bookTrip: async (_, { launchId }, { dataSources: { userAPI } }) => {
    const result = await userAPI.bookTrip(launchId);

    return {
      success: Boolean(result),
      message: Boolean(result)
        ? "Trips booked successfully"
        : "Failed to book trip"
    };
  },
  cancelTrip: async (_, { launchId }, { dataSources: { userAPI } }) => {
    const result = await userAPI.cancelTrip(launchId);

    return {
      success: Boolean(result),
      message: Boolean(result) ? "Trips cancelled" : "Failed to cancel trip"
    };
  }
};

export default Mutation;
