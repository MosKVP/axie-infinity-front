import { InputAdornment, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { ParentDetail } from ".";
import { CalculateResult } from "../../api/breeding.d";
import { roundToPrecision } from "../../util";

interface Props {
  calculateResult: CalculateResult;
  parentDetail: ParentDetail;
  setParentDetail: React.Dispatch<React.SetStateAction<ParentDetail>>;
}

export const AxieParentDetail: React.FC<Props> = ({
  calculateResult,
  parentDetail,
  setParentDetail,
}) => {
  const [state, setState] = useState(parentDetail);
  const { parent1Cost, parent1Sale, parent2Cost, parent2Sale } = state;

  useEffect(() => {
    setState(parentDetail);
  }, [parentDetail]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { valueAsNumber, name } = e.target;
    setState({
      ...state,
      [name]: valueAsNumber,
    });
  };

  const handleUpdate: React.FocusEventHandler<HTMLInputElement> = (e) => {
    const { valueAsNumber, name } = e.target;
    setParentDetail({
      ...parentDetail,
      [name]: isNaN(valueAsNumber) ? 0 : roundToPrecision(valueAsNumber, 3),
    });
  };

  return (
    <div className='parent-detail'>
      <div>
        <h3 className='parent-detail__heading'>Parent 1</h3>
        <div>
          <TextField
            disabled
            className='parent-detail__field'
            variant='outlined'
            type='number'
            margin='dense'
            label='BreedCount'
            name='breedCount'
            size='small'
            value={calculateResult.axieParent1.breedCount}
          />
        </div>
        <div>
          <TextField
            className='parent-detail__field'
            variant='outlined'
            type='number'
            InputProps={{
              inputProps: {
                min: 0,
                step: "0.001",
              },
              startAdornment: (
                <InputAdornment position='start'>Ξ</InputAdornment>
              ),
            }}
            margin='dense'
            label='Cost'
            name='parent1Cost'
            size='small'
            value={parent1Cost}
            onBlur={handleUpdate}
            onChange={handleChange}
          />
        </div>
        <div>
          <TextField
            className='parent-detail__field'
            variant='outlined'
            type='number'
            InputProps={{
              inputProps: {
                min: 0,
                step: "0.001",
              },
              startAdornment: (
                <InputAdornment position='start'>Ξ</InputAdornment>
              ),
            }}
            margin='dense'
            label='Sale'
            name='parent1Sale'
            size='small'
            value={parent1Sale}
            onBlur={handleUpdate}
            onChange={handleChange}
          />
        </div>
      </div>
      <div>
        <h3 className='parent-detail__heading'>Parent 2</h3>
        <div>
          <TextField
            disabled
            className='parent-detail__field'
            variant='outlined'
            type='number'
            margin='dense'
            label='BreedCount'
            name='breedCount'
            size='small'
            value={calculateResult.axieParent2.breedCount}
          />
        </div>
        <div>
          <TextField
            className='parent-detail__field'
            variant='outlined'
            type='number'
            InputProps={{
              inputProps: {
                min: 0,
                step: "0.001",
              },
              startAdornment: (
                <InputAdornment position='start'>Ξ</InputAdornment>
              ),
            }}
            margin='dense'
            label='Cost'
            name='parent2Cost'
            size='small'
            value={parent2Cost}
            onBlur={handleUpdate}
            onChange={handleChange}
          />
        </div>
        <div>
          <TextField
            className='parent-detail__field'
            variant='outlined'
            type='number'
            InputProps={{
              inputProps: {
                min: 0,
                step: "0.001",
              },
              startAdornment: (
                <InputAdornment position='start'>Ξ</InputAdornment>
              ),
            }}
            margin='dense'
            label='Sale'
            name='parent2Sale'
            size='small'
            value={parent2Sale}
            onBlur={handleUpdate}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};
