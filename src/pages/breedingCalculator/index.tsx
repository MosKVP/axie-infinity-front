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

function BreedingCalculator() {
  const [calculateResult, setCalculateResult] =
    React.useState<CalculateResult>();

  const [tokenPrice, setTokenPrice] = useState<Tokens | undefined>();

  const [loading, setLoading] = useState<boolean>(false);

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
                    ? null
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

            <Summary calculateResult={calculateResult} />
          </div>
        ) : null}
      </TokenPrice.Provider>
    </div>
  );
}

export default BreedingCalculator;
