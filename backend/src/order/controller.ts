import { Request, Response } from "express";
import { SWIGGY_ALL_ORDERS } from "../constants";
import axios from "../utils/axios";
import { values } from "../utils/values";

export const getOrders = async (request: Request, response: Response) => {
  const { data } = await axios.get(SWIGGY_ALL_ORDERS, {
    headers: {
      Cookie: values.swiggyCookieValue,
    },
  });
  response.send(data);
};
