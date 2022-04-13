import { model, Schema } from "mongoose";

export interface IFoodItem {
	order_id: string;
	order_time: string;
	restaurant_name: string;
	restaurant_address: string;
	is_veg: string;
	total: number;
	name: string;
	quantity: number;
}

const foodItemSchema = new Schema({
	order_id: String,
	order_time: String,
	restaurant_name: String,
	restaurant_address: String,
	is_veg: String,
	total: Number,
	name: String,
	quantity: Number,
});

export default model<IFoodItem>("foodItem", foodItemSchema);
