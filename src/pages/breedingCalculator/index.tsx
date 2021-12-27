import React, { useEffect, useState } from "react";
import { CalculateResult } from "../../api/breeding.d";
import { getPrice } from "../../api/token";
import { Tokens } from "../../api/token.d";
import { Summary } from "./Summary";
import { Form } from "./Form";
import { TokenPriceContainer } from "../../components/TokenPrice";
import { TokenPrice } from "../../context/TokenPrice";
import { AxieChildDetail } from "./AxieChildDetail";
import { nanoid } from "nanoid";
import { CircularProgress } from "@mui/material";
import { AxieParentDetail } from "./AxieParentDetail";
import { roundToPrecision } from "../../util";

export interface ParentDetail {
  [index: string]: number;
  parent1Cost: number;
  parent1Sale: number;
  parent2Cost: number;
  parent2Sale: number;
}

function BreedingCalculator() {
  const [calculateResult, setCalculateResult] =
    React.useState<CalculateResult>();

  const [tokenPrice, setTokenPrice] = useState<Tokens | undefined>();

  const [loading, setLoading] = useState<boolean>(false);

  const [parentDetail, setParentDetail] = useState<ParentDetail>({
    parent1Cost: 0,
    parent1Sale: 0,
    parent2Cost: 0,
    parent2Sale: 0,
  });
  useEffect(() => {
    setParentDetail({
      parent1Cost: roundToPrecision(
        calculateResult?.axieParent1.currentPrice || 0,
        3
      ),
      parent1Sale: roundToPrecision(
        calculateResult?.axieParent1.salePrice || 0,
        3
      ),
      parent2Cost: roundToPrecision(
        calculateResult?.axieParent2.currentPrice || 0,
        3
      ),
      parent2Sale: roundToPrecision(
        calculateResult?.axieParent2.salePrice || 0,
        3
      ),
    });
  }, [calculateResult?.axieParent1, calculateResult?.axieParent2]);

  async function getTokenPrices() {
    try {
      const res = await getPrice();
      setTokenPrice(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getTokenPrices();
  }, []);

  const handleUpdate: (
    rowIndex: number
  ) => React.FocusEventHandler<HTMLInputElement> = (rowIndex) => (e) => {
    setCalculateResult((oldCalculateResult): CalculateResult | undefined => {
      if (oldCalculateResult === undefined) {
        return oldCalculateResult;
      }
      return {
        ...oldCalculateResult,
        axieChildren: oldCalculateResult.axieChildren.map(
          (oldAxieChild, index) =>
            index === rowIndex
              ? {
                  ...oldAxieChild,
                  price: isNaN(e.target.valueAsNumber)
                    ? 0
                    : e.target.valueAsNumber,
                }
              : oldAxieChild
        ),
      };
    });
  };

  return (
    <div className='container'>
      <TokenPrice.Provider value={tokenPrice}>
        <TokenPriceContainer />
        <Form setCalculateResult={setCalculateResult} setLoading={setLoading} />
        {loading ? (
          <CircularProgress sx={{ display: "block", margin: "2rem auto" }} />
        ) : calculateResult ? (
          <div>
            <br />
            <AxieParentDetail
              calculateResult={calculateResult}
              parentDetail={parentDetail}
              setParentDetail={setParentDetail}
            />
            <div className='axie-children'>
              {calculateResult.axieChildren.map((axieChild, index) => {
                return (
                  <AxieChildDetail
                    key={nanoid()}
                    axieChild={axieChild}
                    index={index}
                    handleUpdate={handleUpdate}
                  />
                );
              })}
            </div>

            <Summary
              calculateResult={calculateResult}
              parentDetail={parentDetail}
            />
          </div>
        ) : null}
      </TokenPrice.Provider>
    </div>
  );
}

export default BreedingCalculator;
