import bodyParser from "body-parser";
import cors from "cors";
import Express from "express";
import mongoose from "mongoose";
import authRouter from "./auth/router";
import { MONGO_DB_URI, PORT } from "./constants";
import orderRouter from "./order/router";
import otpRouter from "./otp/router";
import recommendationsRouter from "./recommendations/router";
import userRouter from "./user/router";

// Connect to MongoDB
mongoose
	.connect(MONGO_DB_URI, {
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
app.use("/recommendations", recommendationsRouter);
app.use("/user", userRouter);

app.listen(PORT, () => {
	console.log(`server started on port :${PORT}.`);
});
