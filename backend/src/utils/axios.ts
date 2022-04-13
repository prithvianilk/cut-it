import axios from "axios";
import { USER_AGENT } from "../constants";

export default axios.create({
  headers: {
    "User-Agent": USER_AGENT,
  },
  withCredentials: true
});
