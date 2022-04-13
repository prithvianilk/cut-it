import { model, Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  items: [{ type: Schema.Types.ObjectId, ref: "foodItem", default: [] }],
});

export default model("User", userSchema);
