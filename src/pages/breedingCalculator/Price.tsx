import { useContext } from "react";
import { TokenPrice } from "../../TokenPriceContext";

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
    displayUSD = (eth * tokenPrice.ethereum.usd).toFixed(2);
  }

  const mod = size === "big" ? "--big" : "";

  return (
    <div className='price'>
      <span className={"price__eth" + mod}>{"Ξ " + displayETH}</span>
      <span className={"price__usd" + mod}>{"$" + displayUSD}</span>
    </div>
  );
};
