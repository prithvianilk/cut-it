import Express from "express";
import bodyParser from "body-parser";
import { PORT } from "./constants";
import otpRouter from "./otp/router";
import orderRouter from "./order/router";
import authRouter from "./auth/router";
import cors from 'cors';

import mongoose from "mongoose";

const db =
	"mongodb+srv://user1:user1@cluster0.cara4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// Connect to MongoDB
mongoose
	.connect(db, {
		// useNewUrlParser: true,
		// useCreateIndex: true,
		// useUnifiedTopology: true,
		// useFindAndModify: false,
	})
	.then(() => console.log("MongoDB Connected..."))
	.catch((err) => console.log(err));

const app = Express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/otp", otpRouter);
app.use("/order", orderRouter);
app.use("/auth", authRouter);

app.listen(PORT, () => {
	console.log(`server started on port :${PORT}.`);
});
