import { Message } from "./../components/Message";
import { toast } from "react-toastify";
import axios from "axios";

const CONFIG_AXIOS_REQUEST_TIMEOUT = 10 * 60 * 1000; // ms
export const httpClient = axios.create({
  timeout: CONFIG_AXIOS_REQUEST_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

const errorInterceptor = (error: any) => {
  if (error.response) {
    console.log(error.response);
    toast.error(
      <Message
        header={error.response.statusText}
        body={error.response.data.error}
      />
    );
  } else {
    toast.error(
      <Message header='Network Error' body='Please try again later' />
    );
  }

  return Promise.reject(error);
};
httpClient.interceptors.response.use((res) => res, errorInterceptor);
