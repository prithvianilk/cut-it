import { Request, Response } from "express";
import User from "../user/model";
import { SWIGGY_ALL_ORDERS } from "../constants";
import FoodItem, { IFoodItem } from "../foodItem/model";
import axios from "../utils/axios";
import querystring from "querystring";
import { users } from "../utils/values";

const app_id = "a7c4ea4a";
const app_key = "9a52902ffe9bf69f2a07cfd8ca98c37c";

const app_id2 = "02dc8611";
const app_key2 = "3802dd78900ed94862463f14d9c5bea6";

export const getNutritionData = async (
	request: Request,
	response: Response,
) => {
	const { name } = request.body;
	const item = await FoodItem.findOne({ name }).exec();
	if (item) {
		const nutritions = await getNutritions(item);
		response.send({
			nutritions,
		});
	} else {
		response.status(404).send();
	}
};

const getNutritions = async (item: IFoodItem) => {
	let name = item.name;
	let category = item.category;
	let subCategory = item.sub_category;
	if (subCategory !== "nota") {
		category = subCategory;
	}
	let nameList = name.split(" ");
	const tasks = await Promise.all([
		...nameList.map((word) => {
			let url = `https://api.edamam.com/api/nutrition-data?app_id=${app_id}&app_key=${app_key}&nutrition-type=logging&ingr=${word}`;
			return axios.get(url);
		}),
	]);
	let calorie = tasks.reduce(
		(p, c) => p.concat(c.data.totalNutrientsKCal.ENERC_KCAL.quantity),
		[],
	);
	let carbCalorie = tasks.reduce(
		(p, c) => p.concat(c.data.totalNutrientsKCal.CHOCDF_KCAL.quantity),
		[],
	);
	let protCalorie = tasks.reduce(
		(p, c) => p.concat(c.data.totalNutrientsKCal.PROCNT_KCAL.quantity),
		[],
	);
	let fatCalorie = tasks.reduce(
		(p, c) => p.concat(c.data.totalNutrientsKCal.FAT_KCAL.quantity),
		[],
	);

	const dietLabels = tasks.reduce((p, c) => p.concat(c.data.dietLabels), []);

	const dietLabel = mode(dietLabels);
	const nutritions = {
		name: nameList,
		category: category,
		calories: {
			calorie: calorie,
			carbCalorie: carbCalorie,
			protCalorie: protCalorie,
			fatCalorie: fatCalorie,
		},
		dietLabels: dietLabel,
	};
	return nutritions;
};

export const getRecommendations = async (
	request: Request,
	response: Response,
) => {
	const { phone } = request.params;
	const user = await User.findOne({ phone })
		.select("calorieBudget items")
		.populate("items")
		.exec();
	const {
		items,
		calorieBudget,
	}: { items: IFoodItem[]; calorieBudget: number } = user;
	const latest2Items = items.slice(0, 2);
	const averageCaloriesPerMeal = calorieBudget / 4;
	const tasks = await Promise.all([
		...latest2Items.map(({ category, sub_category }) => {
			let ingr = category.split(" ").join("+");
			if (sub_category !== "nota") {
				ingr = sub_category.split(" ").join("+");
			}
			const url = `https://api.edamam.com/api/food-database/v2/parser?app_id=${app_id2}&app_key=${app_key2}&nutrition-type=logging&calories=${averageCaloriesPerMeal}&ingr=${ingr}&category=generic-meals`;
			return axios.get(url);
		}),
	]);
	const recommendations = tasks.map(({ data: { hints } }) => {
		return hints.map(({ food }: any) => {
			const { label, nutrients, foodContentsLabel } = food;
			return {
				label,
				nutrients,
				foodContentsLabel,
			};
		});
	});
	response.send(recommendations);
};

function mode(arr: any) {
	return arr
		.sort(
			(a: any, b: any) =>
				arr.filter((v: any) => v === a).length -
				arr.filter((v: any) => v === b).length,
		)
		.pop();
}
