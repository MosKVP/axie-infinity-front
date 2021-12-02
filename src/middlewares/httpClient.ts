import axios from "axios";

const CONFIG_AXIOS_REQUEST_TIMEOUT = 10 * 60 * 1000; // ms
export const httpClient = axios.create({
  timeout: CONFIG_AXIOS_REQUEST_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});
