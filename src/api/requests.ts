import axios, { AxiosResponse } from "axios";
import { IItem, IList } from "../types/interfaces";
import { BASE_URL } from "../utils/constants";
import { INSTANCE } from "./config";

export const api = {
  getItems: async () => {
    return INSTANCE.get(`/items`);
  },
  addItem: async (description: string) => {
    return INSTANCE.post(`/item`, { description });
  },
  removeItem: async (id: string) => {
    return INSTANCE.delete(`/item/${id}`);
  },
  toggleItem: async (id: string, isDone: boolean) => {
    return INSTANCE.put(`/item/status`, { id, isDone: !isDone });
  },
  updateDescription: async (id: string, description: string) => {
    return INSTANCE.put(`/item/desc`, { id, description });
  }
};

export const listApi = {
  getLists: async () => {
    return INSTANCE.get(`/list`);
  },
  getListById: async (id: string) => {
    return INSTANCE.get(`/list/${id}`);
  },
  createList: async (title: string) => {
    return INSTANCE.post(`/list/`, { title });
  },
  removeList: async (id: string) => {
    return INSTANCE.delete(`/list/${id}`);
  },
  addItemToList: async (id: string, description: string) => {
    return INSTANCE.put(`/list`, { id, description });
  },
  removeItemFromList: async (id: string, itemId: string) => {
    return INSTANCE.put(`/list/${id}/${itemId}`);
  },
  updateItemDesc: async (id: string, itemId: string, description: string) => {
    return INSTANCE.put(`/list/desc`, { id, itemId, description });
  },
  updateItemStatus: async (id: string, itemId: string, isDone: boolean) => {
    return INSTANCE.put(`/list/status`, { id, itemId, isDone });
  }
};
