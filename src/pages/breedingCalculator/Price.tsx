import { Fragment, useContext } from "react";
import { TokenPrice } from "../../context/TokenPrice";

interface Props {
  eth: number;
  size?: string;
}

export const Price: React.FC<Props> = ({ eth, size }) => {
  const tokenPrice = useContext(TokenPrice);
  const displayETH = eth.toLocaleString(undefined, {
    maximumFractionDigits: 3,
  });

  let displayUSD = "-";
  if (tokenPrice) {
    displayUSD = (eth * tokenPrice.ethereum.usd).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  const mod = size === "big" ? "--big" : "";

  return (
    <Fragment>
      <span className={`summary__main-value${mod}`}>{`Ξ ${displayETH}`}</span>
      <span className={`summary__side-value${mod}`}>{`$${displayUSD}`}</span>
    </Fragment>
  );
};
