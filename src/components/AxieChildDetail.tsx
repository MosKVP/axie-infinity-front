import { InputAdornment, TextField } from "@mui/material";
import { AxieChild } from "../api/breeding.d";
import { genAxiePicture } from "../util";
import { PartIcon } from "./PartIcon";

interface Props {
  axieChild: AxieChild;
  index: number;
  onChange: any;
}

export const AxieChildDetail = ({
  props: { axieChild, index, onChange },
}: {
  props: Props;
}) => {
  return (
    <div className='card axie-child-detail'>
      <img
        alt=''
        src={genAxiePicture(
          axieChild.class,
          axieChild.mouth.partID,
          axieChild.horn.partID,
          axieChild.back.partID,
          axieChild.tail.partID
        )}
        className='axie-child-detail__image'
      ></img>
      <div>
        <div className='axie-child-detail__heading'>Chance</div>
        <span className='axie-child-detail__chance'>
          {axieChild.chance.toLocaleString(undefined, {
            style: "percent",
            maximumFractionDigits: 2,
          })}
        </span>
      </div>
      <div>
        <div className='axie-child-detail__heading'>Price</div>
        <TextField
          className='axie-child-detail__price'
          variant='outlined'
          type='number'
          style={{ marginLeft: "1rem" }}
          InputProps={{
            inputProps: {
              min: 0,
              step: "0.001",
            },
            startAdornment: <InputAdornment position='start'>Ξ</InputAdornment>,
          }}
          size='small'
          placeholder='Enter Price'
          value={axieChild.price?.toLocaleString(undefined, {
            maximumFractionDigits: 3,
          })}
          onChange={onChange(index)}
        />
      </div>
      <div className='axie-child-detail__heading'>Parts</div>
      <div className='axie-child-detail__parts'>
        <div className='axie-child-detail__part'>
          <PartIcon
            partClass={axieChild.mouth.class}
            partName='mouth'
            className='axie-child-detail__part__icon'
          />
          <span>{axieChild.mouth.name}</span>
        </div>
        <div className='axie-child-detail__part'>
          <PartIcon
            partClass={axieChild.horn.class}
            partName='horn'
            className='axie-child-detail__part__icon'
          />
          <span>{axieChild.horn.name}</span>
        </div>
        <div className='axie-child-detail__part'>
          <PartIcon
            partClass={axieChild.back.class}
            partName='back'
            className='axie-child-detail__part__icon'
          />
          <span>{axieChild.back.name}</span>
        </div>
        <div className='axie-child-detail__part'>
          <PartIcon
            partClass={axieChild.tail.class}
            partName='tail'
            className='axie-child-detail__part__icon'
          />
          <span>{axieChild.tail.name}</span>
        </div>
      </div>
    </div>
  );
};
