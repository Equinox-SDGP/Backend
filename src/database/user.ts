import User from "./models/userModel";
import { IUser } from "./models/userModel";

export const createUser = async (userData: IUser) => {
  // const duplicateCheck = await User.findOne({ email: userData.email }).exec();

  // if (duplicateCheck) {
  //   return new Promise((resolve) => resolve(null));
  // }ß
  const newUser = new User(userData);
  return newUser.save();
};

export const verifyUser = async (userData: IUser) => {
  const user = await User.findOne({ email: userData.email }).exec();
  return user;
};

export const getUser = async (userId: string) => {
  const user = await User.findOne({ _id: userId }).exec();
  return user;
};

export const updateUser = async (userId: string, userData: IUser) => {
  const user = await User.findOneAndUpdate({ _id: userId }, userData, {
    new: true,
  }).exec();
  return user;
};

export const deleteUser = async (userId: string) => {
  const user = await User.findOneAndDelete({ _id: userId }).exec();
  return user;
};
