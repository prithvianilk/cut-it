import { Request, Response } from "express";
import User from "../auth/model";
import { SWIGGY_ALL_ORDERS } from "../constants";
import FoodItem, { IFoodItem } from "../foodItem/model";
import axios from "../utils/axios";
import { users } from "../utils/values";

const getMonthlyData = (items: IFoodItem[]) => {
  let itemFrequency: { [name: string]: number } = {};
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  let curMonth = month;
  let curYear = year;
  for (let i = 1; i <= 12; i++) {
    let val = curYear.toString() + "-" + curMonth.toString();
    itemFrequency[val] = 0;
    curMonth -= 1;
    if (curMonth === 0) {
      curMonth = 12;
      curYear -= 1;
    }
  }

  items.forEach(function (item) {
    let orderDate = new Date(item.order_time);
    let orderMonth = orderDate.getMonth() + 1;
    let orderYear = orderDate.getFullYear();

    if (orderYear === year || (year - orderYear == 1 && orderMonth > month)) {
      let val = orderYear + "-" + orderMonth;
      if (itemFrequency[val]) {
        itemFrequency[val] += item.quantity;
      } else {
        itemFrequency[val] = item.quantity;
      }
    }
  });
  return Object.keys(itemFrequency).map((date) => ({
    type: date,
    value: itemFrequency[date],
  }));
};

const getRestaurantFrequency = (items: IFoodItem[]) => {
  const restaurantFrequency: { [name: string]: number } = {};
  for (const item of items) {
    if (restaurantFrequency[item.restaurant_name]) {
      restaurantFrequency[item.restaurant_name] += item.quantity;
    } else {
      restaurantFrequency[item.restaurant_name] = item.quantity;
    }
  }
  return Object.keys(restaurantFrequency)
    .sort(
      (restaurant1: string, restaurant2: string) =>
        restaurantFrequency[restaurant2] - restaurantFrequency[restaurant1]
    )
    .slice(0, 5)
    .map((restaurantName) => ({
      type: restaurantName,
      value: restaurantFrequency[restaurantName],
    }));
};

const getBudgetPieValues = (items: IFoodItem[], monthlyBudget: Number) => {
  let spent = 0;
  let budget = monthlyBudget.valueOf();
  items.forEach(function (item) {
    spent += item.total;
  });
  if (spent <= budget) {
    return (spent / (spent + budget)) * 100;
  } else {
    return -1;
  }
};

export const getOrders = async (request: Request, response: Response) => {
  const { phone } = request.body;
  let allOrdersSaved = false;
  let lastOrderId = "";
  const allOrders = [];
  while (!allOrdersSaved) {
    const url = `${SWIGGY_ALL_ORDERS}/order_id=${lastOrderId}`;
    const { data } = await axios.get(url, {
      headers: {
        Cookie: users.generate(phone),
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

export const getAndSaveOrders = async (
  request: Request,
  response: Response
) => {
  const { phone } = request.body;
  let allOrdersSaved = false;
  let lastOrderId = "";
  const allItems: IFoodItem[] = [];
  while (!allOrdersSaved) {
    const url = `${SWIGGY_ALL_ORDERS}?order_id=${lastOrderId}`;
    const { data } = await axios.get(url, {
      headers: {
        Cookie: users.generate(phone),
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
    { phone: phone },
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
  const { phone } = request.params;
  const user = await User.findOne({ phone: phone })
    .populate({ path: "items" })
    .exec();
  const frequencyPerFoodName = getFrequencyPerFoodName(user.items);
  const monthlyData = getMonthlyData(user.items);
  const restaurantFrequency = getRestaurantFrequency(user.items);
  const spent = getBudgetPieValues(user.items, user.budget);
  response.send({
    user,
    frequencyPerFoodName,
    monthlyData,
    restaurantFrequency,
    spent,
  });
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
