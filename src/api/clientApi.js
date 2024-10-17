import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const accessToken = cookies.get("userAccessToken");

const baseURL = import.meta.env.VITE_BASE_URL;

const $clientApi = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

$clientApi.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  }
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      const newAccessToken = cookies.get("adminAccessToken");
      if (newAccessToken) {
        clearInterval(interval);
        config.headers.Authorization = `Bearer ${newAccessToken}`;
        resolve(config);
      }
    }, 100);
  });
});

export default $clientApi;
