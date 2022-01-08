import { CalculateRequest, CalculateResult } from "./breeding.d";
import { httpClient } from "../middlewares/httpClient";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;
const URL = BASE_URL + "/api/v1/breeding/calculate";

export const calculate = async (payload: CalculateRequest) =>
  httpClient.post<CalculateResult>(URL, payload);
