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
  },
  toggleItem: async (id: string, isDone: boolean) => {
    return axios.put(`${BASE_URL}/api/item/status`, { id, isDone: !isDone });
  },
  updateDescription: async (id: string, description: string) => {
    return axios.put(`${BASE_URL}/api/item/desc`, { id, description })
  },
};
