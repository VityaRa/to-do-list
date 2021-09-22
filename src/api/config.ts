import axios from "axios";
import { BASE_URL } from "../utils/constants";

export const INSTANCE = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json"
  }
});
