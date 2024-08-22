import axios from "axios";
import { baseUrl } from "./Api";
import Cookie from "cookie-universal";

const cookie = Cookie();
const token = cookie.get("user");

export const Axios = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
