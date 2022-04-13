import Express from "express";
import bodyParser from "body-parser";
import { PORT } from "./constants";
import otpRouter from "./otp/router";
import orderRouter from "./order/router";

const app = Express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/otp", otpRouter);
app.use("/order", orderRouter);

app.listen(PORT, () => {
  console.log(`server started on port :${PORT}.`);
});
