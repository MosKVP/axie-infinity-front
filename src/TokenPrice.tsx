import { useContext } from "react";
import { TokenPrice } from "./TokenPriceContext";
import { Stack } from "@mui/material";
import ethIcon from "./assets/images/eth.png";
import axsIcon from "./assets/images/axs.png";
import slpIcon from "./assets/images/slp.png";

interface Props {}

export const TokenPriceContainer: React.FC<Props> = () => {
  const tokenPrice = useContext(TokenPrice);
  const currency = "usd";
  const currencySymbol = "$";
  return (
    <div className='token-prices'>
      <div className='card token-prices__token-detail'>
        <img
          src={ethIcon}
          alt='ethereum icon'
          className='token-prices__token-detail__image'
        />
        <Stack alignItems='flex-start'>
          <h3>ETH</h3>
          <div>
            {tokenPrice
              ? currencySymbol + tokenPrice["ethereum"][currency]
              : "-"}
          </div>
        </Stack>
      </div>
      <div className='card token-prices__token-detail'>
        <img
          src={axsIcon}
          alt='axs icon'
          className='token-prices__token-detail__image'
        />
        <Stack alignItems='flex-start'>
          <h3>AXS</h3>
          <div>
            {tokenPrice
              ? currencySymbol + tokenPrice["axie-infinity"][currency]
              : "-"}
          </div>
        </Stack>
      </div>
      <div className='card token-prices__token-detail'>
        <img
          src={slpIcon}
          alt='slp icon'
          className='token-prices__token-detail__image'
        />
        <Stack alignItems='flex-start'>
          <h3>SLP</h3>
          <div>
            {tokenPrice
              ? currencySymbol +
                tokenPrice["smooth-love-potion"][currency].toLocaleString(
                  undefined,
                  { maximumFractionDigits: 3 }
                )
              : "-"}
          </div>
        </Stack>
      </div>
    </div>
  );
};
