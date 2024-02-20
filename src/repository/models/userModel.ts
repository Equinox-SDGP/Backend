import { Document, Schema, model } from "mongoose";

export type userType = {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

export interface IUser extends Document{
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = model<IUser>('User', userSchema);

export default User;

