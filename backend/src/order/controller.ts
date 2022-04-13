import { Request, Response } from "express";
import { SWIGGY_ALL_ORDERS } from "../constants";
import axios from "../utils/axios";
import { users } from "../utils/values";

import { IFoodItem } from "../foodItem/model";

const getMonthlyData = async (items: IFoodItem[]) => {
	let itemFrequency = {};
	const today = new Date();
	const month = today.getMonth() + 1;
	const year = today.getFullYear();

	let curMonth = month;
	let curYear = year;
	for (let i = 1; i <= 12; i++) {
		let val = curMonth.toString() + "-" + curYear.toString();
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
			let val = orderMonth + "-" + orderYear;
			if (Object.values(itemFrequency).includes(val)) {
				itemFrequency[val] += item.quantity;
			} else {
				itemFrequency[val] = item.quantity;
			}
		}
	});
	return itemFrequency;
};

const getRestaurantFrequency = async (items: IFoodItem[]) => {
	let restaurantFrequency = [];
	items.forEach(function (item) {
		let restaurant_name = item.restaurant_name;
		if (Object.values(restaurantFrequency).includes(restaurant_name)) {
			restaurantFrequency[restaurant_name] += item.quantity;
		} else {
			restaurantFrequency[restaurant_name] = item.quantity;
		}
	});
	return Object.keys(restaurantFrequency)
		.sort(
			(restaurant1: string, restaurant2: string) =>
				restaurantFrequency[restaurant2] - restaurantFrequency[restaurant1],
		)
		.slice(0, 5)
		.map((restaurantName) => ({
			type: restaurantName,
			value: restaurantFrequency[restaurantName],
		}));
};

const getBudgetPieValues = async (
	items: IFoodItem[],
	monthlyBudget: Number,
) => {
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
					}),
				),
			}),
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
