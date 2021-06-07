import Localbase from "localbase"

class Db {
  private db: any

  constructor() {
    this.db = new Localbase("launches")
  }

  public get database() {
    return this.db
  }
}

export default Db
