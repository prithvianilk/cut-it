import { Request, Response } from "express";
import User from '../auth/model';
import { SWIGGY_ALL_ORDERS } from "../constants";
import FoodItem, { IFoodItem } from "../foodItem/model";
import axios from "../utils/axios";
import { users } from "../utils/values";

export const getOrders = async (request: Request, response: Response) => {
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
  await User.updateOne({ phone: mobile }, { 
    $push: {
      items: foodItemIds
    }
   })
  response.send({
    allItems,
  });
};
