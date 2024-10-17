import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const accessToken = cookies.get("adminAccessToken");

const baseURL = import.meta.env.VITE_BASE_URL;

const $api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

$api.interceptors.request.use((config) => {
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

export default $api;
