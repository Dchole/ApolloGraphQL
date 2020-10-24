import { ExpressContext } from "apollo-server-express/src/ApolloServer";
import { parse, serialize } from "cookie";

const TOKEN_NAME = "tkn";

export const MAX_AGE = 60 * 60 * 24 * 7; // 1 week

export function setTokenCookie(res: ExpressContext["res"], token: string) {
  const cookie = serialize(TOKEN_NAME, token, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/api/refresh-token",
    sameSite: "strict"
  });

  res.setHeader("Set-Cookie", cookie);
}

export function removeTokenCookie(res: ExpressContext["res"]) {
  const cookie = serialize(TOKEN_NAME, "", {
    maxAge: -1,
    path: "/api/refresh-token"
  });

  res.setHeader("Set-Cookie", cookie);
}

export function parseCookies(req: ExpressContext["req"]) {
  // For API Routes we don't need to parse the cookies.
  if (req.cookies) return req.cookies;

  // For pages we do need to parse the cookies.
  const cookie = req.headers?.cookie;
  return parse(cookie || "");
}

export function getTokenCookie(req: ExpressContext["req"]) {
  const cookies = parseCookies(req);
  return cookies[TOKEN_NAME];
}
