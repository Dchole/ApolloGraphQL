export default function serializeHeaders(headers: Headers) {
  let serializedHeaders: Record<string, any> = {}

  for (var entry of headers.entries()) {
    serializedHeaders[entry[0]] = entry[1]
  }

  return serializedHeaders
}
