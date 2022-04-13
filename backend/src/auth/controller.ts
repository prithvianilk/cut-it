import { Request, Response } from "express";
import { User } from "../../models/user";

export const signup = async (request: any, response: Response) => {
	const { phone, username, password } = request.body;

	// Simple validation
	if (!phone || !password || !username) {
		return response.status(400).json({ msg: "Please enter all fields" });
	}

	User.findOne({ phone }).then((user) => {
		if (user) return response.status(400).json({ msg: "User already exists" });

		const newUser = new User({
			username: username,
			phone: phone,
			password: password,
		});

		newUser
			.save()
			.then(() => response.json("User added!"))
			.catch((err: any) => response.status(400).json("Error: " + err));
	});
};

export const login = async (request: Request, response: Response) => {
	const { phone, password } = request.body;

	User.findOne({ phone }).then((user) => {
		if (!user) return response.status(400).json({ msg: "User does not exist" });

		return response.json(user);
	});
};
