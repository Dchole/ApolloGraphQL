import { ApolloError } from "apollo-server";
import { verify } from "jsonwebtoken";
import { Launch } from "./generated/graphql";
import { IPayload } from "./token";

export const getCurrentUserId = (token: string) => {
  if (token) {
    const { userId } = verify(
      token,
      process.env.JWT_ACCESS_SECRET!
    ) as IPayload;

    return userId;
  }

  throw new ApolloError("Not Authenticated");
};

export const paginateResults = (
  pageSize = 20,
  launches: Launch[],
  cursor?: number
) => {
  if (pageSize < 1) return [];
  if (!cursor) return launches.slice(0, pageSize);

  const cursorIndex = launches.findIndex(launch => {
    const launchCursor = Number(launch.id);
    return cursor === launchCursor;
  });

  return cursorIndex >= 0
    ? cursorIndex === launches.length - 1
      ? []
      : launches.slice(
          cursorIndex + 1,
          Math.min(launches.length, cursorIndex + 1 + pageSize)
        )
    : launches.slice(0, pageSize);
};
