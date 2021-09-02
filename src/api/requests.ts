import axios from "axios";
import { IItem } from "../types/interfaces";
import { BASE_URL } from "../utils/constants";

export const api = {
  getItems: async () => {
    return axios.get(`${BASE_URL}/api/items`);
  },
  addItem: async (description: string) => {
    return axios.post(`${BASE_URL}/api/item`, { description });
  },
  removeItem: async (id: string) => {
    return axios.delete(`${BASE_URL}/api/item/${id}`);
  }
};
