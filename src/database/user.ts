import User from "./models/userModel";
import { IUser } from "./models/userModel";

export const createUser = async (userData: IUser) => {
  const duplicateCheck = await User.findOne({ email: userData.email }).exec();

  if (duplicateCheck) {
    return new Promise((resolve) => resolve(null));
  }

  const newUser = new User(userData);
  return newUser.save();
};

export const verifyUser = async (userData: IUser) => {
  const user = await User.findOne({ email: userData.email }).exec();
  return user;
};