import { useContext } from "react";
import { ParentDetail } from ".";
import { AxieChild, CalculateResult } from "../../api/breeding.d";
import { TokenPrice } from "../../context/TokenPrice";
import { calculateTokenNeeded, subtractMarketFee } from "../../util";
import { Price } from "./Price";

interface Props {
  calculateResult: CalculateResult;
  parentDetail: ParentDetail;
}

export const Summary: React.FC<Props> = ({ calculateResult, parentDetail }) => {
  const tokenPrice = useContext(TokenPrice);

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
    totalChildrenSale,
    totalSale,
    totalCost,
    avgCost,
    profit,
    profitPercent,
  } = calculateBreedingCost(
    { calculateResult },
    { parentDetail },
    tokenPrice["axie-infinity"].eth,
    tokenPrice["smooth-love-potion"].eth
  );

  const isLoss = profit < 0;

  return (
    <div className='card summary'>
      <div className='summary__lines'>
        <div className='summary__key'>Optimal Number to Breed</div>
        <div className='summary__main-value'>{optimalBreed}</div>
        <div></div>
        <div className='summary__key'>SLP Needed</div>
        <div className='summary__main-value'>{slpNeeded}</div>
        <div></div>
        <div className='summary__key'>AXS Needed</div>
        <div className='summary__main-value'>{axsNeeded}</div>
        <div></div>
        <div className='summary__key'>Expected sale per Axie</div>
        <Price eth={netExpectedPrice} />
        <div className='summary__key'>Average cost per Axie</div>
        <Price eth={avgCost} />
      </div>
      <br />
      <div>
        <h3 className='summary__header'>Sales</h3>
        <div className='summary__lines'>
          <div className='summary__key'>Parent 1 Sale</div>
          <Price eth={netParent1Sale} />

          <div className='summary__key'>Parent 2 Sale</div>
          <Price eth={netParent2Sale} />

          <div className='summary__key'>Children Sale</div>
          <Price eth={totalChildrenSale} />

          <div className='summary__key--total'>Total Sale</div>
          <Price eth={totalSale} size='big' />
        </div>
        <br />
        <h3 className='summary__header'>Cost</h3>
        <div className='summary__lines'>
          <div className='summary__key'>AXS Cost</div>
          <Price eth={axsCost} />

          <div className='summary__key'>SLP Cost</div>
          <Price eth={slpCost} />

          <div className='summary__key'>Parent 1 Cost</div>
          <Price eth={parentDetail.parent1Cost} />

          <div className='summary__key'>Parent 2 Cost</div>
          <Price eth={parentDetail.parent2Cost} />

          <div className='summary__key--total'>Total Cost</div>
          <Price eth={totalCost} size='big' />
        </div>
        <br />
        <div
          className={
            "card summary__bottom-line--" + (isLoss ? "loss" : "profit")
          }
        >
          <h3 className='summary__bottom-line__key'>
            Estimated {isLoss ? "Loss" : "Profit"}
          </h3>

          <Price eth={profit} size='big' />
          <div className='summary__bottom-line__percent-profit'>
            {"% Profit " +
              profitPercent.toLocaleString(undefined, {
                style: "percent",
                maximumFractionDigits: 2,
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

function calculateExpectedPrice(children: AxieChild[]): number {
  let totalChance = 0;
  let expectedPrice = 0;
  children.forEach(({ chance, price }) => {
    totalChance += chance;
    expectedPrice += (price || 0) * chance;
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
  const avgCost = optimalBreed ? totalCost / optimalBreed : 0;
  const profit = totalSale - totalCost;
  const profitPercent = profit / totalCost;
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
    avgCost,
    profit,
    profitPercent,
  };
}
