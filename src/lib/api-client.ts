"use client";

import { API_VERSION, BASE_URL } from "@/constants/api";
import { LOCAL_STORAGE_KEY } from "@/constants/storage-key";
import axios from "axios";

export const getToken = () => {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.TOKEN) || "null");
};

export const AUTH_TOKEN = `Bearer ${getToken}`;

export const API = axios.create({
  baseURL: BASE_URL + API_VERSION,
});
