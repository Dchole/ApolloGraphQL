export const normalizePathname = (pathname: string) =>
  pathname.endsWith("/") ? pathname.slice(0, pathname.length - 1) : pathname;
