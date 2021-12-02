import { useContext } from "react";
import { TokenPrice } from "./TokenPriceContext";
import { Stack } from "@mui/material";
import ethIcon from "./assets/images/eth.png";
import axsIcon from "./assets/images/axs.png";
import slpIcon from "./assets/images/slp.png";

import "./App.css";

interface Props {}

export const TokenPriceContainer: React.FC<Props> = () => {
  const tokenPrice = useContext(TokenPrice);
  const currency = "usd";
  const currencySymbol = "$";
  const height = "60px";
  return (
    <Stack direction='row' justifyContent='space-evenly'>
      <div>
        <img src={ethIcon} alt='ethereum icon' height={height} />
        <div>ETH</div>
        <div>
          {tokenPrice ? currencySymbol + tokenPrice["ethereum"][currency] : "-"}
        </div>
      </div>
      <div>
        <img src={axsIcon} alt='axs icon' height={height} />
        <div>AXS</div>
        <div>
          {tokenPrice
            ? currencySymbol + tokenPrice["axie-infinity"][currency]
            : "-"}
        </div>
      </div>
      <div>
        <img src={slpIcon} alt='slp icon' height={height} />
        <div>SLP</div>
        <div>
          {tokenPrice
            ? currencySymbol +
              tokenPrice["smooth-love-potion"][currency].toFixed(3)
            : "-"}
        </div>
      </div>
    </Stack>
  );
};
