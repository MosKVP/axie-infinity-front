import React, { useEffect, useState } from "react";
import { Column } from "react-table";
import { AxieChild, CalculateResult } from "../api/breeding.d";
import { getPrice } from "../api/token";
import { Tokens } from "../api/token.d";
import { Detail } from "../Detail";
import { Form } from "../Form";
import { EditableNumberCell, Table } from "../Table";
import { TokenPriceContainer } from "../TokenPrice";
import { TokenPrice } from "../TokenPriceContext";
import { genAxiePicture } from "../util";

interface TableData {
  chance: number;
  price: number | null;
  axie: AxieChild;
}

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

  const columns: ReadonlyArray<Column<TableData>> = React.useMemo(
    () => [
      {
        Header: "Chance",
        accessor: "chance",
        Cell: ({ value }) =>
          value.toLocaleString(undefined, {
            style: "percent",
            minimumFractionDigits: 2,
          }),
      },
      {
        Header: "Price (ETH)",
        accessor: "price",
        Cell: EditableNumberCell,
      },
      {
        Header: "Axie",
        accessor: "axie",
        Cell: ({ value }) => (
          <div className='axie-container'>
            <img
              alt=''
              src={genAxiePicture(
                value.class,
                value.mouth.partID,
                value.horn.partID,
                value.back.partID,
                value.tail.partID
              )}
              width='200'
              height='150'
            ></img>
            <div className='axie-parts-container'>
              <div>{value.mouth.name}</div>
              <div>{value.horn.name}</div>
              <div>{value.back.name}</div>
              <div>{value.tail.name}</div>
            </div>
          </div>
        ),
      },
    ],
    []
  );

  // When our cell renderer calls onUpdate, we'll use
  // the rowIndex, columnId and new value to update the
  // original data
  const onUpdate = (rowIndex: number, columnId: string, value: any) => {
    setCalculateResult((old): CalculateResult | undefined => {
      if (old === undefined) {
        return undefined;
      }
      return {
        ...old,
        axieChildren: old.axieChildren.map((row, index) => {
          if (index === rowIndex) {
            return {
              ...old?.axieChildren[rowIndex],
              [columnId]: value,
            };
          }
          return row;
        }),
      };
    });
  };

  return (
    <div>
      <TokenPrice.Provider value={tokenPrice}>
        <TokenPriceContainer />
        <Form props={{ setCalculateResult, setLoading }} />
        {!loading && calculateResult ? (
          <div>
            <Table
              columns={columns}
              data={(function (): TableData[] {
                return calculateResult.axieChildren.map((value): TableData => {
                  return {
                    chance: value.chance,
                    price: value.price,
                    axie: value,
                  };
                });
              })()}
              onUpdate={onUpdate}
              getRowProps={(row) => ({
                style: {
                  background:
                    row.original.price === null ? "#00000030" : "white",
                },
              })}
            />
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
