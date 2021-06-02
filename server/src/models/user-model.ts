import { Document, model, Schema } from "mongoose"

export interface IUser {
  username: string
  email: string
  password: string
}

export interface IUserSchema extends Document, IUser {
  bookedTrips?: string[]
}

const UserSchema = new Schema({
  username: {
    type: String,
    min: 3,
    max: 20,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    min: 8,
    required: true
  },
  bookedTrips: [
    {
      type: String,
      unique: true
    }
  ]
})

export default model<IUserSchema>("User", UserSchema)
