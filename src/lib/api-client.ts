import { API_VERSION, BASE_URL } from "@/constants/api";
import axios from "axios";

export const API = axios.create({
  baseURL: BASE_URL + API_VERSION,
});
