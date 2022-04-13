import Express from "express";
import bodyParser from "body-parser";
import { MONGO_DB_URI, PORT } from "./constants";
import otpRouter from "./otp/router";
import orderRouter from "./order/router";
import authRouter from "./auth/router";

import mongoose from "mongoose";

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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/otp", otpRouter);
app.use("/order", orderRouter);
app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`server started on port :${PORT}.`);
});
