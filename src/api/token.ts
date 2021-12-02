import { Tokens } from "./token.d";
import { httpClient } from "../middlewares/httpClient";

const URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=axie-infinity%2Cethereum%2Csmooth-love-potion&vs_currencies=eth%2Cusd";

export const getPrice = async () => httpClient.get<Tokens>(URL);