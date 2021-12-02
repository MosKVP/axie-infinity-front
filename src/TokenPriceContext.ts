import { createContext } from "react";
import { Tokens } from "./api/token.d";

export const TokenPrice = createContext<Tokens | undefined>(undefined);
