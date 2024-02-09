import { IUser } from "../database/models/userModel";
import * as User from "../database/user";


const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

export const createUser = async (userData: IUser) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(userData.password, 10, (err: string, hash: string) => {
      if (err) {
        reject(new Error("Error hashing password"));
      } else {
        userData["password"] = hash;
        userData["_id"] = new mongoose.Types.ObjectId();
        
        User.createUser(userData);
      }
    });
  });
};

export const verifyUser = async (userData: IUser) => {
  const user = User.verifyUser(userData);
  if (user != null) {
    return await bcrypt.compare(userData.password, userData.password);
  }
  return Promise.resolve(null);
};

export const getUser = async(userId: string) => {
  return User.getUser(userId);
}