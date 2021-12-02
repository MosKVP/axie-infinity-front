import { TextField } from "@mui/material";
import { useContext, useState } from "react";
import { AxieChild, CalculateResult } from "./api/breeding.d";
import { TokenPrice } from "./TokenPriceContext";
import {
  calculateTokenNeeded,
  displayETH,
  displayUSD,
  subtractMarketFee,
} from "./util";

interface Props {
  calculateResult: CalculateResult;
}

interface ParentDetail {
  parent1Cost: number;
  parent1Sale: number;
  parent2Cost: number;
  parent2Sale: number;
}

export const Detail = ({ props: { calculateResult } }: { props: Props }) => {
  const tokenPrice = useContext(TokenPrice);
  const [parentDetail, setParentDetail] = useState<ParentDetail>({
    parent1Cost: calculateResult.axieParent1.currentPrice || 0,
    parent1Sale: calculateResult.axieParent1.salePrice || 0,
    parent2Cost: calculateResult.axieParent2.currentPrice || 0,
    parent2Sale: calculateResult.axieParent2.salePrice || 0,
  });

  const { parent1Cost, parent1Sale, parent2Cost, parent2Sale } = parentDetail;
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    let { value, name } = e.target;
    setParentDetail({
      ...parentDetail,
      [name]: parseFloat(value),
    });
  };

  if (!tokenPrice) {
    return <div></div>;
  }

  const {
    optimalBreed,
    slpNeeded,
    slpCost,
    axsNeeded,
    axsCost,
    netExpectedPrice,
    netParent1Sale,
    netParent2Sale,
    totalParentSale,
    totalChildrenSale,
    totalSale,
    totalParentCost,
    totalCost,
    profit,
  } = calculateBreedingCost(
    { calculateResult },
    { parentDetail },
    tokenPrice["axie-infinity"].eth,
    tokenPrice["smooth-love-potion"].eth
  );

  return (
    <div>
      <div>Parent 1</div>
      <div>
        <TextField
          variant='outlined'
          type='number'
          InputProps={{
            readOnly: true,
          }}
          margin='dense'
          label='BreedCount'
          name='breedCount'
          size='small'
          value={calculateResult.axieParent1.breedCount}
        />
      </div>
      <div>
        <TextField
          variant='outlined'
          type='number'
          InputProps={{
            inputProps: {
              min: 0,
              step: "0.001",
            },
          }}
          margin='dense'
          label='Cost (ETH)'
          name='parent1Cost'
          size='small'
          value={parent1Cost}
          onChange={handleChange}
        />
      </div>
      <div>
        <TextField
          variant='outlined'
          type='number'
          InputProps={{
            inputProps: {
              min: 0,
              step: "0.001",
            },
          }}
          margin='dense'
          label='Sale (ETH)'
          name='parent1Sale'
          size='small'
          value={parent1Sale}
          onChange={handleChange}
        />
      </div>
      <div>Parent 2</div>
      <div>
        <TextField
          variant='outlined'
          type='number'
          InputProps={{
            readOnly: true,
          }}
          margin='dense'
          label='BreedCount'
          name='breedCount'
          size='small'
          value={calculateResult.axieParent2.breedCount}
        />
      </div>
      <div>
        <TextField
          variant='outlined'
          type='number'
          InputProps={{
            inputProps: {
              min: 0,
              step: "0.001",
            },
          }}
          margin='dense'
          label='Cost (ETH)'
          name='parent2Cost'
          size='small'
          value={parent2Cost}
          onChange={handleChange}
        />
      </div>
      <div>
        <TextField
          variant='outlined'
          type='number'
          InputProps={{
            inputProps: {
              min: 0,
              step: "0.001",
            },
          }}
          margin='dense'
          label='Sale (ETH)'
          name='parent2Sale'
          size='small'
          value={parent2Sale}
          onChange={handleChange}
        />
      </div>
      <div>Optimal Breed {optimalBreed}</div>
      <div>
        <div>Sales</div>
        <div>Parent 1 Sale {displayETH(netParent1Sale)}</div>
        <div>Parent 2 Sale {displayETH(netParent2Sale)}</div>
        <div>Total Parent Sale {displayETH(totalParentSale)}</div>
        <div>Children Sale {displayETH(netExpectedPrice)}</div>
        <div>Total Children Sale {displayETH(totalChildrenSale)}</div>
        <div>Total Sale {displayETH(totalSale)}</div>
      </div>
      <br />
      <div>
        <div>Cost</div>
        <div>AXS Needed {axsNeeded}</div>
        <div>AXS Cost {displayETH(axsCost)}</div>
        <div>SLP Needed {slpNeeded}</div>
        <div>SLP Cost {displayETH(slpCost)}</div>
        <div>Parent 1 Cost {displayETH(parent1Cost)}</div>
        <div>Parent 2 Cost {displayETH(parent2Cost)}</div>
        <div>Total Parent Cost {displayETH(totalParentCost)}</div>
        <div>Total Cost {displayETH(totalCost)}</div>
      </div>
      <br />
      <div>Profit {displayETH(profit)}</div>
      <div>Profit {displayUSD(profit * tokenPrice.ethereum.usd)}</div>
    </div>
  );
};

function calculateExpectedPrice(children: AxieChild[]): number {
  let totalChance = 0;
  let expectedPrice = 0;
  children.forEach(({ chance, price }) => {
    if (price !== null) {
      totalChance += chance;
      expectedPrice += price * chance;
    }
  });
  return totalChance === 0 ? 0 : expectedPrice / totalChance;
}

function calculateBreedingCost(
  {
    calculateResult: { axieParent1, axieParent2, axieChildren },
  }: {
    calculateResult: CalculateResult;
  },
  {
    parentDetail: { parent1Cost, parent1Sale, parent2Cost, parent2Sale },
  }: {
    parentDetail: ParentDetail;
  },

  axsPrice: number,
  slpPrice: number
) {
  let optimalBreed = 0;
  let slpNeeded = 0;
  let slpCost = 0;
  let axsNeeded = 0;
  let axsCost = 0;

  const netExpectedPrice = subtractMarketFee(
    calculateExpectedPrice(axieChildren)
  );

  for (
    var bc1 = axieParent1.breedCount, bc2 = axieParent2.breedCount;
    bc1 < 7 && bc2 < 7;
    bc1++, bc2++
  ) {
    const { slp, axs } = calculateTokenNeeded(bc1, bc2);
    const marginalAXSCost = axs * axsPrice;
    const marginalSLPCost = slp * slpPrice;
    const marginalBreedingCost = marginalSLPCost + marginalAXSCost;
    if (marginalBreedingCost > netExpectedPrice) {
      break;
    }
    axsNeeded += axs;
    axsCost += marginalAXSCost;
    slpNeeded += slp;
    slpCost += marginalSLPCost;
    optimalBreed++;
  }

  const netParent1Sale = subtractMarketFee(parent1Sale);
  const netParent2Sale = subtractMarketFee(parent2Sale);
  const totalParentSale = netParent1Sale + netParent2Sale;
  const totalChildrenSale = netExpectedPrice * optimalBreed;
  const totalSale = totalParentSale + totalChildrenSale;

  const totalParentCost = parent1Cost + parent2Cost;
  const totalCost = totalParentCost + axsCost + slpCost;
  const profit = totalSale - totalCost;
  return {
    optimalBreed,
    axsNeeded,
    axsCost,
    slpNeeded,
    slpCost,
    netExpectedPrice,
    netParent1Sale,
    netParent2Sale,
    totalParentSale,
    totalChildrenSale,
    totalSale,
    totalParentCost,
    totalCost,
    profit,
  };
}
