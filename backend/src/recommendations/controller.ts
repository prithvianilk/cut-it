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

export const getData = async (request: Request, response: Response) => {
	const { mobile } = request.params;
	const user = await User.findOne({ phone: mobile })
		.populate({ path: "items" })
		.exec();
	const nutritions = await getNutritions(user.items);
	response.send({
		user,
		nutritions,
	});
};

const getNutritions = async (foodItems: IFoodItem[]) => {
	const item = foodItems[foodItems.length - 1];
	const dishes = [];
	let name = item.name;
	let category = item.category;
	let subCategory = item.sub_category;
	if (subCategory !== "nota") {
		category = subCategory;
	}
	let nameList = name.split(" ");
	console.log(nameList);
	const tasks = await Promise.all([
		...nameList.map((word) => {
			let url = `https://api.edamam.com/api/nutrition-data?app_id=${app_id}&app_key=${app_key}&nutrition-type=logging&ingr=${word}`;
			return axios.get(url);
		}),
	]);
	// let calorie = tasks.reduce(
	// 	(p, c) => p + c.data.totalNutrientsKCal.ENERC_KCAL.quantity,
	// 	0,
	// );
	// let carbCalorie = tasks.reduce(
	// 	(p, c) => p + c.data.totalNutrientsKCal.CHOCDF_KCAL.quantity,
	// 	0,
	// );
	// let protCalorie = tasks.reduce(
	// 	(p, c) => p + c.data.totalNutrientsKCal.PROCNT_KCAL.quantity,
	// 	0,
	// );
	// let fatCalorie = tasks.reduce(
	// 	(p, c) => p + c.data.totalNutrientsKCal.FAT_KCAL.quantity,
	// 	0,
	// );
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

	let dietLabels = tasks.reduce((p, c) => p.concat(c.data.dietLabels), []);
	console.log(dietLabels);
	console.log(calorie, carbCalorie, protCalorie, fatCalorie);

	const nutritions = {
		name: nameList,
		category: category,
		calories: {
			calorie: calorie,
			carbCalorie: carbCalorie,
			protCalorie: protCalorie,
			fatCalorie: fatCalorie,
		},
		dietLabels: dietLabels,
	};
	return nutritions;
};

// const getRecommendations
