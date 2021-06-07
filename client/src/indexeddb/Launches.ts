import { LaunchConnection } from "../generated/graphql"
import hashPayload, { TPayload } from "../utils/hash-payload"
import Db from "./create-db"

class Launch extends Db {
  private collection = this.database.collection("launches")

  async getLaunchConnection(payload: TPayload) {
    const key = hashPayload(payload)
    return this.collection.doc(key).get()
  }

  async saveLaunchConnection(
    launchConnection: LaunchConnection,
    payload: TPayload
  ) {
    const key = hashPayload(payload)
    this.collection.add(launchConnection, key)
  }
}

export default Launch
