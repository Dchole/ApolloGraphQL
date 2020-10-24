import { sign } from "jsonwebtoken";

export interface IPayload {
  userId: string;
}

export const createAccessToken = (payload: IPayload) =>
  sign(payload, process.env.JWT_ACCESS_SECRET!);

export const createRefreshToken = (payload: IPayload) =>
  sign(payload, process.env.JWT_REFRESH_SECRET!, { expiresIn: "7d" });
