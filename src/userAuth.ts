import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import User, { IUser } from "../src/repository/models/userModel";
import fetch from "node-fetch";

const router = express.Router();
const bcrypt = require("bcrypt");

//Passport.js JWT strategy
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || "secretkey",
    },
    async (payload: any, done: any) => {
      try {
        const user: IUser | null = await User.findById(payload.userId);
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

router.post("/login", async (req: Request, res: Response) => {
  try {
    // user credentials from request body
    const { email, password }: { email: string; password: string } = req.body;

    const user: IUser | null = await User.findOne({ email });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate token
    const token: string = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "secretkey"
    );

    // Sending token back to the client
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//authentication endpoint
router.post("/google-auth", async (req: Request, res: Response) => {
  try {
    const { accessToken }: { accessToken: string } = req.body;

    // Fetch user info from Google API using access token
    const response = await fetch("userInfo URL", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user info from Google API");
    }

    const userInfo = await response.json();

    // Check if the user already exists in the database
    let user: IUser | null = await User.findOne({ email: userInfo });

    // If user doesn't exist create a new user
    if (!user) {
      user = await User.create({
        // email: userInfo.email,
      });
    }

    // Generate JWT token
    const token: string = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "secretkey"
    );

    // Sending token back to the client
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Middleware protect routes
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("jwt", { session: false }, (err: Error, user: any) => {
    if (err || !user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    req.body.user = user;
    next();
  })(req, res, next);
};

// Example
router.get("/protected", authenticateToken, (req: Request, res: Response) => {
  res.json({ message: "You are authorized" });
});

export default router;
