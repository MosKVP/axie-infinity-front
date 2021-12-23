import { InputAdornment, TextField, Tooltip } from "@mui/material";
import React, { useState } from "react";
import { AxieChild } from "../api/breeding.d";
import {
  genAxiePicture,
  getSearchMarketPlaceLink,
  roundToPrecision,
} from "../util";
import { PartIcon } from "./PartIcon";
import { ReactComponent as OpenInNew } from "../assets/images/open-in-new.svg";

interface Props {
  axieChild: AxieChild;
  index: number;
  handleUpdate: (rowIndex: number) => React.FocusEventHandler<HTMLInputElement>;
}

export const AxieChildDetail: React.FC<Props> = ({
  axieChild,
  index,
  handleUpdate,
}) => {
  const [price, setPrice] = useState(
    axieChild.price ? roundToPrecision(axieChild.price, 3) : null
  );
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setPrice(e.target.valueAsNumber);
  };

  return (
    <div className='card axie-child-detail'>
      <div className='axie-child-detail__link-wrapper'>
        <a
          href={getSearchMarketPlaceLink(
            axieChild.class,
            [
              axieChild.mouth.partID,
              axieChild.horn.partID,
              axieChild.back.partID,
              axieChild.tail.partID,
            ],
            0,
            0
          )}
          target='_blank'
          rel='noreferrer noopener'
        >
          <Tooltip title='Search in Marketplace'>
            <OpenInNew className='axie-child-detail__link-icon' />
          </Tooltip>
        </a>
      </div>
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
          sx={{ marginLeft: "1rem" }}
          InputProps={{
            inputProps: {
              min: 0,
              step: "0.001",
            },
            startAdornment: <InputAdornment position='start'>Ξ</InputAdornment>,
          }}
          size='small'
          placeholder='Enter Price'
          value={price ? price : ""}
          onBlur={handleUpdate(index)}
          onChange={handleChange}
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
          <span className='axie-child-detail__part__name'>
            {axieChild.mouth.name}
          </span>
        </div>
        <div className='axie-child-detail__part'>
          <PartIcon
            partClass={axieChild.horn.class}
            partName='horn'
            className='axie-child-detail__part__icon'
          />
          <span className='axie-child-detail__part__name'>
            {axieChild.horn.name}
          </span>
        </div>
        <div className='axie-child-detail__part'>
          <PartIcon
            partClass={axieChild.back.class}
            partName='back'
            className='axie-child-detail__part__icon'
          />
          <span className='axie-child-detail__part__name'>
            {axieChild.back.name}
          </span>
        </div>
        <div className='axie-child-detail__part'>
          <PartIcon
            partClass={axieChild.tail.class}
            partName='tail'
            className='axie-child-detail__part__icon'
          />
          <span className='axie-child-detail__part__name'>
            {axieChild.tail.name}
          </span>
        </div>
      </div>
    </div>
  );
};
