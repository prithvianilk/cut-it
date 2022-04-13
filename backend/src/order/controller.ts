import { Request, Response } from "express";
import { SWIGGY_ALL_ORDERS } from "../constants";
import axios from "../utils/axios";
import { users } from "../utils/values";

export const getOrders = async (request: Request, response: Response) => {
  const { mobile } = request.body;
  let allOrdersSaved = false;
  let lastOrderId = "";
  const allOrders = [];
  while (!allOrdersSaved) {
    const url = `${SWIGGY_ALL_ORDERS}/order_id=${lastOrderId}`;
    const { data } = await axios.get(url, {
      headers: {
        Cookie: users.generate(mobile),
      },
    });
    const orders = data.orders.map(
      ({
        order_time,
        restaurant_name,
        restaurant_address,
        order_items,
      }: any) => ({
        order_time,
        restaurant_address,
        restaurant_name,
        order_items: order_items.map(
          ({ is_veg, total, name, quantity }: any) => ({
            is_veg,
            total,
            name,
            quantity,
          })
        ),
      })
    );
    const currentNumberOfOrders = orders.length;
    if (currentNumberOfOrders === 0) {
      allOrdersSaved = true;
    } else {
      lastOrderId = orders[currentNumberOfOrders - 1];
      allOrders.push(orders);
    }
  }
  response.send({
    allOrders,
  });
};
