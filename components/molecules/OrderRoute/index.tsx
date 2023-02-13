import React, { useCallback, useEffect, useState } from "react";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AddRoadIcon from "@mui/icons-material/AddRoad";
import RemoveRoadIcon from '@mui/icons-material/RemoveRoad';
import { MapComponent } from "../../atoms/MapComponent";
import { OrderRouteProps } from "./types";
import { getCookie } from "cookies-next";
import {ItemTypeProps} from "../NavList/type/itemType";

export const OrderRoute = ({getInfoFromMap, onNextStepStatus, onFreeCarStatus, getFrom, currentStep} : OrderRouteProps) => {
  const [checked, setChecked] = useState<boolean>(false);
  const role = getCookie('role');
  const [countTransfer, setCountTransfer] = useState<number>(0);
  const [from, setFrom] = useState<string>('');
  const [transfer, setTransfer] = useState<string>('');
  const [transfer2, setTransfer2] = useState<string>('');
  const [transfer3, setTransfer3] = useState<string>('');
  const [transfer4, setTransfer4] = useState<string>('');
  const [to, setTo] = useState<string>('');
  const [distance, setDistance] = useState<string>('');
  const [duration, setDuration] = useState<string>('');

  const addTransfer = useCallback(() => {
    setCountTransfer(countTransfer + 1);
  }, [countTransfer]);

  const deleteTransfer = useCallback(() => {
    setCountTransfer(countTransfer - 1);
  }, [countTransfer]);

  useEffect(() => {
    if (countTransfer === 3) {
      setTransfer4('');
    } else if (countTransfer === 2) {
      setTransfer3('');
    } else if (countTransfer === 1) {
      setTransfer2('');
    } else if (countTransfer === 0) {
      setTransfer('');
    }
  }, [countTransfer]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    setTo('');
    onFreeCarStatus(event.target.checked);
  };

  const onChangeFrom = useCallback((event: React.ChangeEvent< HTMLInputElement>) => {
    setFrom(event.target.value);
    getFrom(event.target.value);
  }, []);

  const onChangeTransfer = useCallback((event: React.ChangeEvent< HTMLInputElement>) => {
    setTransfer(event.target.value);
  }, []);

  const onChangeTransfer2 = useCallback((event: React.ChangeEvent< HTMLInputElement>) => {
    setTransfer2(event.target.value);
  }, []);

  const onChangeTransfer3 = useCallback((event: React.ChangeEvent< HTMLInputElement>) => {
    setTransfer3(event.target.value);
  }, []);

  const onChangeTransfer4 = useCallback((event: React.ChangeEvent< HTMLInputElement>) => {
    setTransfer4(event.target.value);
  }, []);

  const onChangeTo = useCallback((event: React.ChangeEvent< HTMLInputElement>) => {
    setTo(event.target.value);
  }, []);

  const getMapInfo = (duration: string, distance: string) => {
    setDistance(distance);
    setDuration(duration);
    getInfoFromMap(duration, distance, from, transfer, transfer2, transfer3, transfer4, to);
  }

  useEffect(() => {
    if (role === 'driver') {
      if (checked) {
        if (from) {
          onNextStepStatus(true);
        } else {
          onNextStepStatus(false);
        }
      } else {
        if (distance && duration && to) {
          onNextStepStatus(true);
        } else {
          onNextStepStatus(false);
        }
      }
    } else {
      if (to && from && distance && duration) {
        onNextStepStatus(true);
      } else {
        onNextStepStatus(false);
      }
    }
  }, [to, from, distance, duration, checked]);

  return (
    <div className="flex flex-col gap-4">
      {role === 'driver' && currentStep === ItemTypeProps.ADD_TRUCK && (
        <FormControlLabel
          className="p-2 bg-[#00abc2] w-full mr-0 ml-0 rounded text-white"
          control={
            <Checkbox
              className="p-0 mr-2"
              checked={checked}
              sx={{
                '& .MuiSvgIcon-root': { fontSize: 32, color: '#fff' },
              }}
              onChange={ handleChange }
              inputProps={{ 'aria-label': 'controlled' }}
            />
          }
          label="Заявка свободной машины"
        />
      )}
      <TextField
        id="from"
        label="Откуда"
        variant="outlined"
        className="autofill:bg-transparent dark:autofill:bg-sky"
        value={from}
        onChange={onChangeFrom}
      />
      {!checked && (
        <>
          {countTransfer >= 1 && (
            <TextField
              id="transfer1"
              label="Промежуточный пункт"
              variant="outlined"
              value={transfer}
              onChange={onChangeTransfer}
            />
          )}
          {countTransfer >= 2 && (
            <TextField
              id="transfer2"
              label="Промежуточный пункт"
              variant="outlined"
              value={transfer2}
              onChange={onChangeTransfer2}
            />
          )}
          {countTransfer >= 3 && (
            <TextField
              id="transfer3"
              label="Промежуточный пункт"
              variant="outlined"
              value={transfer3}
              onChange={onChangeTransfer3}
            />
          )}
          {countTransfer >= 4 && (
            <TextField
              id="transfer4"
              label="Промежуточный пункт"
              variant="outlined"
              value={transfer4}
              onChange={onChangeTransfer4}
            />
          )}
          {countTransfer !== 4 && (
            <IconButton
              aria-label="addTransfer"
              className="text-[#00ABC2] dark:text-white"
              onClick={addTransfer}
            >
              <AddRoadIcon className="mr-2" />
              <Typography>
                Добавить промежуточный пункт
              </Typography>
            </IconButton>
          )}
          {countTransfer > 0 && (
            <IconButton
              aria-label="deleteTransfer"
              className="text-[#00ABC2] dark:text-white"
              onClick={deleteTransfer}
            >
              <RemoveRoadIcon className="mr-2" />
              <Typography>
                Удалить промежуточный пункт
              </Typography>
            </IconButton>
          )}
          <TextField
            id="to"
            label="Куда"
            variant="outlined"
            value={to}
            onChange={onChangeTo}
          />
          <MapComponent
            from={from}
            transfer={transfer}
            transfer2={transfer2}
            transfer3={transfer3}
            transfer4={transfer4}
            to={to}
            getInfoMap={getMapInfo}
          />
        </>
      )}
    </div>
  )
}
