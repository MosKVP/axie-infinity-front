import { CalculateRequest, CalculateResult } from "./breeding.d";
import { httpClient } from "../middlewares/httpClient";

const URL = "/api/v1/breeding/calculate";

export const calculate = async (payload: CalculateRequest) =>
  httpClient.post<CalculateResult>(URL, payload);
