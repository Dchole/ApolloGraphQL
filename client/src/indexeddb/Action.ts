import { IPayload } from "../utils/hash-payload"
import Db from "./create-db"

class Action extends Db {
  private collection = this.database.collection("actions")

  async saveMutation(
    url: string,
    headers: Record<string, any>,
    payload: IPayload
  ) {
    this.collection.add({ url, headers, payload }, payload.operationName)
  }

  async getMutation(
    operationName: string
  ): Promise<{ url: string; headers: Record<string, any>; payload: IPayload }> {
    return this.collection.doc(operationName).get()
  }
}

export default Action
