import { Request, Response, NextFunction } from "express";
import * as userService from "../services/userService";

/** Add the user to the database after validation
 *
 * @param req
 * @param res
 * @param next
 */
export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const userData = req.body;
  // try {
  //   await validate(userData);
  // } catch (error) {
  //   const e = new Error("Invalid email or password!");
  //   return next(e);
  // }

  try {
    const user = await userService.createUser(userData);
    if (user) {
      res.status(201).json({
        message: "User created successfully",
      });
    } else {
      const e = new Error("User already exists!");
      return next(e);
    }
  } catch (error) {
    const e = new Error("Error creating user!");
    return next(e);
  }
};

export const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  const userData = req.body;
  console.log(userData);
};

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.id;
  console.log(userId);
  
  try {
    const user = await userService.getUser(userId);
    if (user) {
      res.status(200).json({
        user,
      });
    } else {
      const e = new Error("User not found!");
      return next(e);
    }
  } catch (error) {
    const e = new Error("Error fetching user!");
    return next(e);
  }
}
