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

export const getAllUsersData = async (_: Request, response: Response) => {
  const users = await User.find({}).populate("items").exec();
  const date = new Date().getTime();
  const userLeaderBoardList = users
    .filter(({ isDataStored }) => isDataStored)
    .map(({ username, items }) => ({
      username,
      numberOfOrdersInPastMonth: items.filter((item: any) => {
        const orderDate = new Date(item.order_time).getTime();
        const isFromPastMonth = date - orderDate < 60 * 60 * 24 * 30 * 1000;
        return isFromPastMonth;
      }).length,
    }))
    .sort(
      (
        { numberOfOrdersInPastMonth: numberOfOrders1 }: any,
        { numberOfOrdersInPastMonth: numberOfOrders2 }: any
      ) => numberOfOrders1 - numberOfOrders2
    );
  response.send(userLeaderBoardList);
};
