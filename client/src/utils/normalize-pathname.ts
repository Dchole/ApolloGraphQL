export const normalizePathname = (pathname: string) =>
  pathname.length > 1 && pathname.endsWith("/")
    ? pathname.slice(0, pathname.length - 1)
    : pathname
