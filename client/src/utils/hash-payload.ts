import CryptoJS from "crypto-js"

export interface IPayload {
  operationName: string
  query: string
  variables: Record<string, any>
}

const hashPayload = (payload: IPayload) => {
  return CryptoJS.MD5(JSON.stringify(payload)).toString()
}

export default hashPayload
