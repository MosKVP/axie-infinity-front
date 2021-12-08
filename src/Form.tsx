import { Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { calculate } from "./api/breeding";
import { CalculateRequest, CalculateResult } from "./api/breeding.d";
import { useDebounce } from "./hooks/useDebounce";
import { getAxiePictureFromID } from "./util";

interface Props {
  setCalculateResult: React.Dispatch<
    React.SetStateAction<CalculateResult | undefined>
  >;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Form = ({
  props: { setCalculateResult, setLoading },
}: {
  props: Props;
}) => {
  const [calculateReq, setCalculateReq] = useState<CalculateRequest>({
    axieParentID1: "",
    axieParentID2: "",
  });
  const debouncedParentID1 = useDebounce(calculateReq.axieParentID1, 500);
  const debouncedParentID2 = useDebounce(calculateReq.axieParentID2, 500);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    let { value, name } = e.target;
    setCalculateReq({
      ...calculateReq,
      [name]: String(value),
    });
  };
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    fetchCalculateResult(calculateReq);
  };

  const fetchCalculateResult = async (payload: CalculateRequest) => {
    setLoading(true);
    try {
      const res = await calculate(payload);
      setCalculateResult(res.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className='axie-parent-form'>
        <Stack>
          <img
            src={getAxiePictureFromID(debouncedParentID1)}
            alt='axie parent 1'
            height='200px'
          />
          <TextField
            variant='outlined'
            type='number'
            label='Parent 1'
            name='axieParentID1'
            placeholder='Axie ID'
            InputProps={{
              inputProps: {
                min: 1,
              },
            }}
            value={calculateReq.axieParentID1}
            onChange={handleChange}
          />
        </Stack>
        <Stack>
          <img
            src={getAxiePictureFromID(debouncedParentID2)}
            alt='axie parent 2'
            height='200px'
          />
          <TextField
            variant='outlined'
            type='number'
            label='Parent 2'
            name='axieParentID2'
            placeholder='Axie ID'
            InputProps={{
              inputProps: {
                min: 1,
              },
            }}
            value={calculateReq.axieParentID2}
            onChange={handleChange}
          />
        </Stack>
      </div>
      <div className='center'>
        <Button variant='contained' type='submit' size='large'>
          Submit
        </Button>
      </div>
    </form>
  );
};
