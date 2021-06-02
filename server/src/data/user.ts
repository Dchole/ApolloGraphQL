import { MongoDataSource } from "apollo-datasource-mongodb"
import { AuthenticationError } from "apollo-server"
import { IUser, IUserSchema } from "../models/user-model"
import { getCurrentUserId } from "../utils"

interface IContext {
  token: string
}

class UserAPI extends MongoDataSource<IUserSchema, IContext> {
  async getLoggedInUser() {
    if (!this.context.token) throw new AuthenticationError("Unauthenticated")

    const userId = getCurrentUserId(this.context.token)
    return this.findOneById(userId)
  }

  async getUser(email: string) {
    return this.model.findOne({ email })
  }

  async createUser(userData: IUser) {
    await this.model.create(userData)
  }

  async bookTrip(launchId: string) {
    const user = await this.getLoggedInUser()

    const bookedTrips = [...(user?.bookedTrips || [])]
    if (bookedTrips.includes(launchId)) {
      throw new Error("Trip Already booked!")
    }

    const updatedBookedTrips = [...bookedTrips, launchId]
    await user?.updateOne({ bookedTrips: updatedBookedTrips })
    return launchId
  }

  async cancelTrip(launchId: string) {
    const user = await this.getLoggedInUser()

    const bookedTrips = [...(user?.bookedTrips || [])]
    const updatedBookedTrips = bookedTrips.filter(trip => trip !== launchId)

    await user?.updateOne({ bookedTrips: updatedBookedTrips })
    return launchId
  }

  async getLaunchIdsByUser() {
    const user = await this.getLoggedInUser()
    return user?.bookedTrips || []
  }

  async isLaunchBooked(launchId: string) {
    const user = await this.getLoggedInUser()
    return user?.bookedTrips?.includes(launchId) || false
  }
}

export default UserAPI
