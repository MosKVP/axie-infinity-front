import React, { useEffect, useState } from "react";
import { CalculateResult } from "../api/breeding.d";
import { getPrice } from "../api/token";
import { Tokens } from "../api/token.d";
import { Detail } from "../Detail";
import { Form } from "../Form";
import { TokenPriceContainer } from "../components/TokenPrice";
import { TokenPrice } from "../TokenPriceContext";
import { AxieChildDetail } from "../components/AxieChildDetail";
import { nanoid } from "nanoid";

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
              ? { ...oldAxieChild, price: e.target.valueAsNumber }
              : oldAxieChild
        ),
      };
    });
  };

  return (
    <div className='container'>
      <TokenPrice.Provider value={tokenPrice}>
        <TokenPriceContainer />
        <Form props={{ setCalculateResult, setLoading }} />
        {!loading && calculateResult ? (
          <div>
            <div className='axie-children'>
              {calculateResult.axieChildren.map((axieChild, index) => {
                return (
                  <AxieChildDetail
                    key={nanoid()}
                    props={{ axieChild, index, handleUpdate }}
                  />
                );
              })}
            </div>

            <Detail
              props={{
                calculateResult: calculateResult,
              }}
            />
          </div>
        ) : null}
      </TokenPrice.Provider>
    </div>
  );
}

export default BreedingCalculator;
