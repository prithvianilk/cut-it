import User from "./model";
import { Request, Response } from "express";

export const updateUser = async (request: Request, response: Response) => {
  const { phone } = request.params;
  await User.findOneAndUpdate(
    { phone },
    {
      $set: {
        ...request.body,
      },
    }
  ).exec();
  response.send();
};
