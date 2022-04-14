import { Request, Response } from "express";
import User from "../user/model";

export const signup = async (request: any, response: Response) => {
  const { username, phone, password } = request.body;

  // Simple validation
  if (!phone || !password || !username) {
    return response.status(400).json({ msg: "Please enter all fields" });
  }

  User.findOne({ phone }).then((user) => {
    if (user) return response.status(400).json({ msg: "User already exists" });

    const newUser = new User({
      username,
      phone,
      password,
    });

    newUser
      .save()
      .then(() => response.json("User added!"))
      .catch((err: any) => response.status(400).json("Error: " + err));
  });
};

export const login = async (request: Request, response: Response) => {
  const { phone, password } = request.body;
  User.findOne({ phone, password }).then((user) => {
    if (!user) return response.status(400).json({ msg: "User does not exist" });

    return response.json(user);
  });
};
