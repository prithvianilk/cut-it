import { Request, Response } from "express";
import User from "../auth/model";
import { SWIGGY_ALL_ORDERS } from "../constants";
import FoodItem, { IFoodItem } from "../foodItem/model";
import axios from "../utils/axios";
import { users } from "../utils/values";

export const getAndSaveOrders = async (
  request: Request,
  response: Response
) => {
  const { mobile } = request.body;
  let allOrdersSaved = false;
  let lastOrderId = "";
  const allItems: IFoodItem[] = [];
  while (!allOrdersSaved) {
    const url = `${SWIGGY_ALL_ORDERS}?order_id=${lastOrderId}`;
    const { data } = await axios.get(url, {
      headers: {
        Cookie: users.generate(mobile),
      },
    });
    const {
      data: { orders },
    } = data;
    const currentNumberOfOrders = orders.length;
    if (currentNumberOfOrders === 0) {
      allOrdersSaved = true;
    } else {
      orders.forEach(
        ({
          order_id,
          order_time,
          restaurant_name,
          restaurant_address,
          order_items,
        }: any) => {
          const orderItems = order_items.map(
            ({ is_veg, total, name, quantity }: any) => ({
              order_id,
              order_time,
              restaurant_name,
              restaurant_address,
              is_veg,
              total,
              name,
              quantity,
            })
          );
          allItems.push(...orderItems);
        }
      );
      lastOrderId = allItems[allItems.length - 1].order_id;
    }
  }
  const foodItemIds = await FoodItem.insertMany(allItems);
  await User.updateOne(
    { phone: mobile },
    {
      $push: {
        items: foodItemIds,
      },
    }
  );
  response.send({
    allItems,
  });
};

export const getData = async (request: Request, response: Response) => {
  const { mobile } = request.body;
  const user = await User.findOne({ phone: mobile })
    .populate({ path: "items" })
    .exec();
  const frequencyPerFoodName = getFrequencyPerFoodName(user.items);
  response.send({ user, frequencyPerFoodName });
};

const getFrequencyPerFoodName = (foodItems: IFoodItem[]) => {
  const frequencyPerFoodName: { [name: string]: number } = {};
  for (const { name } of foodItems) {
    if (frequencyPerFoodName[name]) {
      frequencyPerFoodName[name] += 1;
    } else {
      frequencyPerFoodName[name] = 1;
    }
  }
  return Object.keys(frequencyPerFoodName)
    .sort(
      (food1: string, food2: string) =>
        frequencyPerFoodName[food2] - frequencyPerFoodName[food1]
    )
    .slice(0, 5)
    .map((foodName) => ({
      type: foodName,
      value: frequencyPerFoodName[foodName],
    }));
};
