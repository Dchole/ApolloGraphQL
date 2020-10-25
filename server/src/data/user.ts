import { MongoDataSource } from "apollo-datasource-mongodb";
import { Maybe } from "../generated/graphql";
import { IUser, IUserSchema } from "../models/user-model";
import { getCurrentUserId } from "../utils";

interface IContext {
  token: string;
}

class UserAPI extends MongoDataSource<IUserSchema, IContext> {
  async getLoggedInUser() {
    const userId = getCurrentUserId(this.context.token);
    return await this.findOneById(userId);
  }

  async getUser(email: string) {
    return await this.model.findOne({ email });
  }

  async createUser({ username, email, password }: IUser) {
    await this.model.create({ username, email, password });
  }

  async bookTrip(launchId: Maybe<string>) {
    const user = await this.getLoggedInUser();

    const bookedTrips = [...(user?.bookedTrips || []), launchId];

    return user?.updateOne({ bookedTrips });
  }

  async cancelTrip(launchId: string) {
    const user = await this.getLoggedInUser();

    const bookedTrips = [...(user?.bookedTrips || [])];
    const updatedBookedTrips = bookedTrips.filter(trip => trip !== launchId);

    return await user?.updateOne({ bookedTrips: updatedBookedTrips });
  }

  async getLaunchIdsByUser() {
    const user = await this.getLoggedInUser();
    return user?.bookedTrips || [];
  }

  async isLaunchBooked(launchId: string) {
    const user = await this.getLoggedInUser();
    return user?.bookedTrips?.includes(launchId) || false;
  }
}

export default UserAPI;
