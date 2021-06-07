import CryptoJS from "crypto-js"

export type TPayload = Record<string, any>

const hashPayload = (payload: TPayload) =>
  CryptoJS.MD5(JSON.stringify(payload)).toString()

export default hashPayload
